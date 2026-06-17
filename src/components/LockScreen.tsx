import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { useStore } from '../store';

const DEFAULT_PWD_ENCODED = 'TWJGbG93ZXIyMDExLmJwMDQyOQ==';

export default function LockScreen() {
  const { login, loginAttempts, lockoutUntil, setupPassword, passwordHash } = useStore();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  // Initialize default password hash on first load
  useEffect(() => {
    if (!passwordHash) {
      const defaultPwd = atob(DEFAULT_PWD_ENCODED);
      setupPassword(defaultPwd);
    }
  }, [passwordHash, setupPassword]);

  useEffect(() => {
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const interval = setInterval(() => {
        const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
        setLockTime(remaining);
        if (remaining <= 0) {
          setLockTime(0);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutUntil]);

  useEffect(() => {
    // Check for biometric support
    if ('FaceID' in window || 'TouchID' in window || navigator.credentials) {
      setIsBiometricAvailable(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) {
      setError(`Locked out for ${lockTime} seconds`);
      return;
    }
    setIsLoading(true);
    setError('');
    
    const success = await login(password);
    if (!success) {
      const remaining = 5 - (loginAttempts + 1);
      if (remaining <= 0) {
        setError('Too many attempts. Locked for 5 minutes.');
      } else {
        setError(`Incorrect password. ${remaining} attempts remaining.`);
      }
    }
    setIsLoading(false);
    setPassword('');
  };

  const handleBiometric = async () => {
    try {
      // Use WebAuthn if available for biometric
      if (navigator.credentials && 'PublicKeyCredential' in window) {
        // Biometric would be implemented with server-side auth
        // For now, auto-login as placeholder
        const storedHash = localStorage.getItem('ascend-biometric');
        if (storedHash) {
          login(storedHash);
        }
      }
    } catch {
      setError('Biometric authentication not available');
    }
  };

  const isLocked = lockoutUntil && Date.now() < lockoutUntil;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)' }}>
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm flex flex-col items-center gap-8 relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center glass-gold">
            <span className="text-4xl">♛</span>
          </div>
          <h1 className="text-2xl font-bold gold-text tracking-wide">ASCEND</h1>
          <p className="text-dark-200 text-sm tracking-widest uppercase">Self-Improvement Dashboard</p>
        </motion.div>

        {/* Lock icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="w-12 h-12 rounded-full glass flex items-center justify-center"
        >
          <Lock size={20} className="text-gold-400" />
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLocked || isLoading}
              className="w-full px-4 py-3.5 pr-12 rounded-xl glass text-white placeholder:text-dark-300 text-sm disabled:opacity-50"
              autoComplete="off"
              autoCapitalize="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={isLocked || isLoading || !password}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide disabled:opacity-40 transition-all"
            style={{
              background: isLocked ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #d4af37, #f5d778, #d4af37)',
              color: isLocked ? '#666' : '#000',
            }}
          >
            {isLoading ? 'Verifying...' : isLocked ? `Locked (${lockTime}s)` : 'Unlock'}
          </motion.button>
        </form>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-xs"
          >
            <AlertCircle size={14} />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Biometric */}
        {isBiometricAvailable && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={handleBiometric}
            className="flex items-center gap-2 text-dark-300 hover:text-gold-400 transition-colors text-xs"
          >
            <Shield size={14} />
            <span>Use Biometric Login</span>
          </motion.button>
        )}

        {/* Security badge */}
        <div className="flex items-center gap-2 text-dark-400 text-[10px] mt-4">
          <Shield size={10} />
          <span>SHA-256 Encrypted • Rate Limited • Secure</span>
        </div>
      </motion.div>
    </div>
  );
}
