import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, CreditCard, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { Member, PLAN_PRICES, PLAN_DISPLAY } from '../../lib/types';
import { formatRupees } from '../../lib/utils';
import { useData } from '../../context/DataContext';

type PayMethod = 'upi' | 'card';
type Stage     = 'select' | 'details' | 'processing' | 'success' | 'error';

interface Props {
  member:    Member;
  onClose:   () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ member, onClose, onSuccess }: Props) {
  const { addPayment } = useData();
  const [method,    setMethod]    = useState<PayMethod>('upi');
  const [stage,     setStage]     = useState<Stage>('select');
  const [upiId,     setUpiId]     = useState('');
  const [cardNo,    setCardNo]    = useState('');
  const [expiry,    setExpiry]    = useState('');
  const [cvv,       setCvv]       = useState('');
  const [cardName,  setCardName]  = useState('');
  const [error,     setError]     = useState('');

  const amount = PLAN_PRICES[member.plan];

  const handleProceed = () => {
    setError('');
    if (method === 'upi') {
      if (!upiId || !upiId.includes('@')) { setError('Enter a valid UPI ID (e.g. yourname@upi)'); return; }
    } else {
      if (cardNo.replace(/\s/g, '').length < 16) { setError('Enter a valid 16-digit card number'); return; }
      if (!expiry.match(/^\d{2}\/\d{2}$/)) { setError('Enter expiry in MM/YY format'); return; }
      if (cvv.length < 3) { setError('Enter a valid CVV'); return; }
      if (!cardName) { setError('Enter the name on card'); return; }
    }
    processPayment();
  };

  const processPayment = async () => {
    setStage('processing');
    await new Promise(r => setTimeout(r, 2200));
    // 95% success rate for demo
    const success = Math.random() > 0.05;
    if (success) {
      addPayment(member.id, method);
      setStage('success');
      setTimeout(onSuccess, 1800);
    } else {
      setStage('error');
    }
  };

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val: string) =>
    val.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={e => { if (e.target === e.currentTarget && stage !== 'processing') onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-card border border-border rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40">Secure Payment</p>
              <p className="font-heading text-lg font-bold">{formatRupees(amount)}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-foreground/40 font-body">
                <Lock className="w-3 h-3" /> SSL Secured
              </div>
              {stage !== 'processing' && (
                <button onClick={onClose} className="w-8 h-8 rounded-lg bg-background flex items-center justify-center hover:bg-border transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-background/50 px-6 py-3 flex items-center justify-between text-sm border-b border-border">
            <span className="text-foreground/50 font-body">{PLAN_DISPLAY[member.plan]}</span>
            <span className="font-heading font-bold text-gradient">{formatRupees(amount)}</span>
          </div>

          <div className="p-6">

            {/* ── SELECT METHOD ── */}
            {(stage === 'select' || stage === 'details') && (
              <>
                {/* Method tabs */}
                <div className="flex bg-background border border-border rounded-xl p-1 mb-5">
                  {(['upi', 'card'] as const).map(m => (
                    <button key={m} onClick={() => { setMethod(m); setStage('select'); setError(''); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-heading text-xs uppercase tracking-wider transition-all
                        ${method === m && stage !== 'select' ? 'bg-primary text-white' :
                          method === m ? 'bg-primary text-white' : 'text-foreground/40 hover:text-foreground'}`}
                    >
                      {m === 'upi' ? <Smartphone className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                      {m === 'upi' ? 'UPI' : 'Card'}
                    </button>
                  ))}
                </div>

                {/* UPI form */}
                {method === 'upi' && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {['GPay', 'PhonePe', 'Paytm'].map(app => (
                        <div key={app} className="bg-background border border-border rounded-lg py-3 text-center">
                          <p className="font-heading text-xs uppercase tracking-wider text-foreground/50">{app}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="yourname@upi or yourname@okaxis"
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body
                                   placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Card form */}
                {method === 'card' && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">Card Number</label>
                      <input
                        type="text"
                        value={cardNo}
                        onChange={e => setCardNo(formatCard(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body font-mono
                                   placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">Name on Card</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        placeholder="RAHUL SHARMA"
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body uppercase
                                   placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">Expiry</label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={e => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body font-mono
                                     placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">CVV</label>
                        <input
                          type="password"
                          value={cvv}
                          onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-body
                                     placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 flex items-center gap-2 text-sm text-primary">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                  </div>
                )}

                <button onClick={handleProceed}
                  className="btn-primary-premium w-full py-3 text-sm mt-5">
                  Pay {formatRupees(amount)}
                </button>
              </>
            )}

            {/* ── PROCESSING ── */}
            {stage === 'processing' && (
              <div className="py-10 text-center">
                <div className="relative w-16 h-16 mx-auto mb-5">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
                </div>
                <p className="font-heading text-base uppercase tracking-wider mb-2">Processing Payment</p>
                <p className="text-sm text-foreground/50 font-body">Please wait, do not close this window…</p>
              </div>
            )}

            {/* ── SUCCESS ── */}
            {stage === 'success' && (
              <div className="py-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                </motion.div>
                <p className="font-heading text-xl uppercase tracking-tight mb-2">Payment Successful!</p>
                <p className="text-sm text-foreground/60 font-body mb-1">
                  {formatRupees(amount)} received via {method.toUpperCase()}
                </p>
                <p className="text-sm text-foreground/60 font-body">Your membership has been renewed.</p>
              </div>
            )}

            {/* ── ERROR ── */}
            {stage === 'error' && (
              <div className="py-8 text-center">
                <AlertCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="font-heading text-xl uppercase tracking-tight mb-2">Payment Failed</p>
                <p className="text-sm text-foreground/60 font-body mb-5">
                  Something went wrong. Please try again.
                </p>
                <button onClick={() => { setStage('select'); setCardNo(''); setCvv(''); setExpiry(''); setUpiId(''); }}
                  className="btn-primary-premium px-8 py-3 text-sm">
                  Try Again
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
