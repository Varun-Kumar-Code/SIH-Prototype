import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import "../styles/auth.css";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate credentials
    console.log("Login attempt:", formData);
    
    // For now, just navigate to home page
    setLocation("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
    setLocation("/");
  };

  return (
    <div className="login-background">
      {/* Natural Video Background */}
      <video 
        className="background-video" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source 
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" 
          type="video/mp4" 
        />
        <source 
          src="https://videos.pexels.com/video-files/2795405/2795405-uhd_2560_1440_25fps.mp4" 
          type="video/mp4" 
        />
        {/* Fallback for browsers that don't support video */}
      </video>
      
      <div className="login-glass">
        <h2>Welcome back!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <div className="password-row">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="login-input"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span 
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <a href="#" className="forgot-link">FORGOT PASSWORD?</a>
          <Button type="submit" className="login-button">
            LOG IN
          </Button>
        </form>

        <div className="divider">or sign in with</div>
        <div className="social-icons">
          <button 
            type="button"
            className="social-icon google" 
            title="Google"
            onClick={() => handleSocialLogin('Google')}
          />
          <button 
            type="button"
            className="social-icon apple" 
            title="Apple"
            onClick={() => handleSocialLogin('Apple')}
          />
          <button 
            type="button"
            className="social-icon facebook" 
            title="Facebook"
            onClick={() => handleSocialLogin('Facebook')}
          />
        </div>

        <div className="signup-row">
          Don't have an account?{" "}
          <button
            type="button"
            className="signup-link"
            onClick={() => setLocation("/signup")}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}