// PBKDF2-SHA256 Cryptographic Authentication & Security Service

const DEFAULT_SALT = "seif_studio_crypto_salt_2026_top1_depi_scholar";
const DEFAULT_USERNAME = "seif";
// Salted PBKDF2 hash of 'seif-admin-2026'
const DEFAULT_HASH = "8f3b2046fa3b5938db02c9ffea8245ba5f5348ff2e5c8e41be8627ec7f4da7e1";

export async function hashCredentials(username, password, salt = DEFAULT_SALT) {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${username}:${password}`);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    data,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export function getOrCreateSalt() {
  let salt = localStorage.getItem("seif_admin_salt");
  if (!salt) {
    salt = DEFAULT_SALT;
    localStorage.setItem("seif_admin_salt", salt);
  }
  return salt;
}

export function getStoredHash() {
  return localStorage.getItem("seif_admin_hash") || DEFAULT_HASH;
}

export function getStoredUsername() {
  return localStorage.getItem("seif_admin_username") || DEFAULT_USERNAME;
}

export function checkLockout() {
  const attempts = parseInt(localStorage.getItem("seif_login_attempts") || "0", 10);
  const lockoutUntil = parseInt(localStorage.getItem("seif_lockout_until") || "0", 10);
  const now = Date.now();

  if (lockoutUntil && now < lockoutUntil) {
    const minutesLeft = Math.ceil((lockoutUntil - now) / 60000);
    return { isLocked: true, minutesLeft };
  }

  if (lockoutUntil && now >= lockoutUntil) {
    localStorage.removeItem("seif_login_attempts");
    localStorage.removeItem("seif_lockout_until");
  }

  return { isLocked: false, attempts };
}

export function recordFailedAttempt() {
  const currentAttempts = parseInt(localStorage.getItem("seif_login_attempts") || "0", 10) + 1;
  localStorage.setItem("seif_login_attempts", currentAttempts.toString());

  if (currentAttempts >= 5) {
    const lockoutUntil = Date.now() + 15 * 60 * 1000; // 15 minutes lockout
    localStorage.setItem("seif_lockout_until", lockoutUntil.toString());
    return { isLocked: true, minutesLeft: 15 };
  }

  return { isLocked: false, attempts: currentAttempts };
}

export function resetLockout() {
  localStorage.removeItem("seif_login_attempts");
  localStorage.removeItem("seif_lockout_until");
}

export async function verifyCredentials(username, password) {
  const lockout = checkLockout();
  if (lockout.isLocked) {
    return {
      success: false,
      message: `تم قفل محاولات الدخول مؤقتاً لحماية الحساب. يرجى الانتظار ${lockout.minutesLeft} دقيقة.`
    };
  }

  const salt = getOrCreateSalt();
  const inputHash = await hashCredentials(username, password, salt);
  const storedHash = getStoredHash();
  const storedUser = getStoredUsername();

  // Also check default hardcoded fallback
  const isDefaultMatch = (username === "seif" && password === "seif-admin-2026");
  const isHashMatch = (inputHash === storedHash && username === storedUser);

  if (isDefaultMatch || isHashMatch) {
    resetLockout();
    return { success: true };
  } else {
    const lockResult = recordFailedAttempt();
    if (lockResult.isLocked) {
      return {
        success: false,
        message: "تم تجاوز الحد الأقصى للمحاولات (5). تم تفعيل الحظر الأمني لمدة 15 دقيقة."
      };
    }
    const remaining = 5 - (lockResult.attempts || 1);
    return {
      success: false,
      message: `بيانات الدخول غير صحيحة. متبقي لديك ${remaining} محاولات.`
    };
  }
}

export async function updateCredentials(newUsername, newPassword) {
  const salt = getOrCreateSalt();
  const newHash = await hashCredentials(newUsername, newPassword, salt);
  localStorage.setItem("seif_admin_hash", newHash);
  localStorage.setItem("seif_admin_username", newUsername);
  return true;
}

export function isSessionActive() {
  const auth = sessionStorage.getItem("seif_admin_authenticated");
  const timestamp = parseInt(sessionStorage.getItem("seif_admin_auth_timestamp") || "0", 10);
  const now = Date.now();
  const maxSessionDuration = 4 * 60 * 60 * 1000; // 4 hours

  if (auth === "true" && timestamp && (now - timestamp < maxSessionDuration)) {
    return true;
  }
  return false;
}

export function terminateSession() {
  sessionStorage.removeItem("seif_admin_authenticated");
  sessionStorage.removeItem("seif_admin_auth_timestamp");
}

export const cryptoService = {
  verifyCredentials,
  authenticate: verifyCredentials,
  hashCredentials,
  getOrCreateSalt,
  isSessionActive,
  terminateSession,
  updateCredentials,
  updateAdminCredentials: updateCredentials
};

export default cryptoService;
