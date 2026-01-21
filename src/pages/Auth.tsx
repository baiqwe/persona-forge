import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { ForgeCard } from "@/components/shared/ForgeCard";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

export default function Auth() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    
    try {
      if (mode === "signin") {
        const { error } = await signIn(values.email, values.password);
        if (error) {
          toast({
            title: t("auth.authError"),
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: t("auth.signInSuccess"),
            description: t("auth.signInSuccessDesc"),
          });
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp(values.email, values.password);
        if (error) {
          toast({
            title: t("auth.authError"),
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: t("auth.signUpSuccess"),
            description: t("auth.signUpSuccessDesc"),
          });
          navigate("/dashboard");
        }
      }
    } catch (err) {
      toast({
        title: t("auth.authError"),
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <Flame className="h-10 w-10 text-primary glow-ember" />
              <span className="font-display text-3xl font-bold text-gradient-ember">
                {t("common.appName")}
              </span>
            </div>
            <p className="text-muted-foreground">
              {mode === "signin" 
                ? t("auth.welcomeBack")
                : t("auth.joinTheForge")}
            </p>
          </motion.div>

          <ForgeCard glow>
            {/* Mode Tabs */}
            <div className="flex mb-6 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setMode("signin")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === "signin"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("common.signIn")}
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === "signup"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("common.signUp")}
              </button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common.email")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder={t("auth.emailPlaceholder")}
                            className="pl-10 bg-secondary border-border"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common.password")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder={t("auth.passwordPlaceholder")}
                            className="pl-10 bg-secondary border-border"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      variant="ember"
                      size="lg"
                      className="w-full mt-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t("common.loading")}
                        </>
                      ) : (
                        <>
                          {mode === "signin" ? t("common.signIn") : t("common.signUp")}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === "signin" ? (
                <>
                  {t("auth.noAccount")}{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-primary hover:underline"
                  >
                    {t("common.signUp")}
                  </button>
                </>
              ) : (
                <>
                  {t("auth.hasAccount")}{" "}
                  <button
                    onClick={() => setMode("signin")}
                    className="text-primary hover:underline"
                  >
                    {t("common.signIn")}
                  </button>
                </>
              )}
            </p>
          </ForgeCard>
        </div>
      </div>
    </Layout>
  );
}
