import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronRight, ChevronLeft, CheckCircle2, User, MapPin, ShieldCheck, FileCheck } from 'lucide-react';
import { REGISTRATION_STEPS } from '@/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // I'll need to add this shadcn component
import { BioStep } from '@/components/registration/BioStep';
import { LocationStep } from '@/components/registration/LocationStep';
import { IdentityStep } from '@/components/registration/IdentityStep';
import { ReviewStep } from '@/components/registration/ReviewStep';
import { DigitalIDCard } from '@/components/dashboard/DigitalIDCard';
import { Link } from 'react-router-dom';

const registrationSchema = z.object({
  // Bio
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  gender: z.enum(['male', 'female', 'other']),
  dob: z.string().min(1, 'Date of birth is required'),
  occupation: z.string().min(2, 'Occupation is required'),
  membershipType: z.enum(['Member', 'Delegate', 'Aspirant']),
  // Location
  state: z.string().min(1, 'State is required'),
  lga: z.string().min(1, 'LGA is required'),
  ward: z.string().min(1, 'Ward is required'),
  pollingUnit: z.string().min(1, 'Polling Unit is required'),
  // Identity
  nin: z.string().optional(),
  voterId: z.string().optional(),
  passportUrl: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const STEPS = [
  { id: 'bio', title: 'Bio Data', icon: User },
  { id: 'location', title: 'Location', icon: MapPin },
  { id: 'identity', title: 'Identity', icon: ShieldCheck },
  { id: 'review', title: 'Review', icon: FileCheck },
];

export function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      gender: 'male',
      dob: '',
      occupation: '',
      membershipType: 'Member',
      state: '',
      lga: '',
      ward: '',
      pollingUnit: '',
    }
  });

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await methods.trigger(fields as any);
    if (isValid) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit(methods.getValues());
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    window.scrollTo(0, 0);
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0: return ['fullName', 'email', 'phone', 'gender', 'dob', 'occupation', 'membershipType'];
      case 1: return ['state', 'lga', 'ward', 'pollingUnit'];
      case 2: return ['nin', 'voterId', 'passportUrl'];
      default: return [];
    }
  };

  const [formData, setFormData] = useState<any>(null);

  const handleSubmit = (data: RegistrationFormData) => {
    console.log('Final Data:', data);
    setFormData(data);
    setIsCompleted(true);
  };

  const currentProgress = ((currentStep + 1) / STEPS.length) * 100;

  if (isCompleted && formData) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col lg:flex-row items-center gap-12 bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl border border-emerald-100"
        >
          <div className="flex-1 text-center lg:text-left">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-8">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Welcome to ADC, <span className="text-emerald-600">{formData.fullName.split(' ')[0]}</span>!</h2>
            <p className="text-gray-600 mb-10 leading-relaxed text-lg max-w-lg">
              Your digital registration is complete. You are now a verified member of the African Democratic Congress. Your digital ID card is ready for use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/dashboard">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 h-16 rounded-2xl px-12 text-lg shadow-xl shadow-emerald-500/20">
                  Enter Member Portal
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <DigitalIDCard 
              data={{
                fullName: formData.fullName,
                membershipId: `ADC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
                state: formData.state,
                lga: formData.lga,
                photoUrl: formData.passportUrl,
                membershipType: formData.membershipType
              }}
            />
            <p className="mt-8 text-xs text-gray-400 font-medium uppercase tracking-widest">Digital ID Preview (Front & Back)</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-20 lg:py-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Join the Movement</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Complete the form below to become a registered member of the African Democratic Congress.</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center relative z-10 font-bold">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  currentStep >= i 
                    ? "bg-[#058541] border-[#058541] text-white shadow-lg shadow-emerald-500/30" 
                    : "bg-white border-gray-200 text-gray-400"
                )}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={cn(
                  "mt-3 text-[10px] uppercase tracking-widest font-bold hidden sm:block",
                  currentStep >= i ? "text-[#058541]" : "text-gray-400"
                )}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          {/* Progress Bar Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-0" />
          <motion.div 
            className="absolute top-6 left-6 h-0.5 bg-[#058541] -z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep) / (STEPS.length - 1)) * 95}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <FormProvider {...methods}>
          <form className="bg-white p-8 md:p-12 rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="min-h-[400px]"
              >
                {currentStep === 0 && <BioStep />}
                {currentStep === 1 && <LocationStep />}
                {currentStep === 2 && <IdentityStep />}
                {currentStep === 3 && <ReviewStep />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={cn("h-12 px-6 rounded-lg font-bold text-gray-500", currentStep === 0 && "opacity-0 invisible")}
              >
                <ChevronLeft className="mr-2 w-4 h-4" />
                Previous Step
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="h-12 px-10 rounded-lg bg-[#e31e24] hover:bg-red-700 text-white font-bold min-w-[180px] shadow-lg shadow-red-200 uppercase tracking-widest text-xs"
              >
                {currentStep === STEPS.length - 1 ? 'Complete Registration' : 'Next Step'}
                {currentStep !== STEPS.length - 1 && <ChevronRight className="ml-2 w-4 h-4" />}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
