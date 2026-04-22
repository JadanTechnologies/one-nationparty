import React, { useState, useRef, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Camera, Upload, ShieldCheck, X, RefreshCw, Check } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function IdentityStep() {
  const { control, setValue, watch } = useFormContext();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const passportUrl = watch('passportUrl');
  const webcamRef = useRef<Webcam>(null);

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setValue('passportUrl', imageSrc, { shouldValidate: true });
      setIsCameraOpen(false);
    }
  }, [setValue]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('passportUrl', reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Identity Verification</h3>
        <p className="text-gray-500 text-sm">Secure your membership with valid identification.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={control}
          name="nin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National Identity Number (NIN)</FormLabel>
              <FormControl>
                <Input placeholder="11-digit NIN" className="h-12" {...field} />
              </FormControl>
              <FormDescription>Optional but recommended for faster verification.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="voterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voter's Card ID (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="VIN from your Voter's Card" className="h-12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <FormLabel>Passport Photograph</FormLabel>
        
        {isCameraOpen ? (
          <div className="relative rounded-3xl overflow-hidden bg-black aspect-video max-w-md mx-auto shadow-2xl">
            <Webcam
              {...({
                audio: false,
                ref: webcamRef,
                screenshotFormat: "image/jpeg",
                className: "w-full h-full object-cover",
                videoConstraints: { facingMode: "user" },
                mirrored: true
              } as any)}
            />
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4 px-6">
              <Button 
                type="button" 
                variant="destructive"
                onClick={() => setIsCameraOpen(false)}
                className="rounded-full w-12 h-12 p-0"
              >
                <X size={20} />
              </Button>
              <Button 
                type="button" 
                onClick={capturePhoto}
                className="bg-emerald-600 hover:bg-emerald-700 rounded-full w-14 h-14 p-0 shadow-xl shadow-emerald-500/40"
              >
                <Camera size={24} />
              </Button>
            </div>
          </div>
        ) : passportUrl ? (
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-emerald-500/20 shadow-2xl bg-gray-50">
                <img src={passportUrl} alt="Passport" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={() => setValue('passportUrl', '')}
                className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-600/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                <RefreshCw size={32} className="text-white animate-spin-slow" />
              </div>
            </div>
            <p className="mt-4 text-emerald-600 font-bold flex items-center">
              <Check size={16} className="mr-2" />
              Photo captured successfully
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setIsCameraOpen(true)}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-8 hover:border-emerald-500 hover:bg-emerald-50 transition-all group active:scale-95"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Camera className="w-6 h-6 text-emerald-600 group-hover:text-white" />
              </div>
              <span className="text-sm font-bold text-gray-600 group-hover:text-emerald-700">Take Live Photo</span>
            </button>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-8 hover:border-emerald-500 hover:bg-emerald-50 transition-all group cursor-pointer active:scale-95">
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Upload className="w-6 h-6 text-gray-500 group-hover:text-white" />
              </div>
              <span className="text-sm font-bold text-gray-600 group-hover:text-emerald-700">Upload Photo</span>
            </label>
          </div>
        )}
        <p className="text-xs text-gray-400 text-center">Supported formats: JPG, PNG. Max size: 2MB.</p>
      </div>
    </div>
  );
}
