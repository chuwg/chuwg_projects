import React, { useState } from 'react';
import { 
  Container, Typography, TextField, Button, Box, Paper,
  Stepper, Step, StepLabel, styled 
} from '@mui/material';
import { Person, Email, Lock, Done } from '@mui/icons-material';

const FormContainer = styled(Paper)({
  padding: '3rem',
  borderRadius: '15px',
  maxWidth: '600px',
  margin: '0 auto',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const StyledTextField = styled(TextField)({
  marginBottom: '1.5rem',
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#2E7D32',
    },
  },
});

const StyledButton = styled(Button)({
  padding: '12px 0',
  fontSize: '1.1rem',
  marginTop: '1rem',
  borderRadius: '8px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const steps = ['기본 정보', '연락처 정보', '완료'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <StyledTextField
              fullWidth
              label="이름"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: <Person color="primary" sx={{ mr: 1 }} />,
              }}
            />
            <StyledTextField
              fullWidth
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: <Email color="primary" sx={{ mr: 1 }} />,
              }}
            />
            <StyledTextField
              fullWidth
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: <Lock color="primary" sx={{ mr: 1 }} />,
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <StyledTextField
              fullWidth
              label="전화번호"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="주소"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={3}
            />
          </>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Done sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              회원가입이 완료되었습니다!
            </Typography>
            <Typography color="text.secondary">
              제주 애월읍 초당옥수수의 특별한 맛을 즐겨보세요.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container sx={{ 
      marginTop: '80px',
      marginBottom: '3rem' 
    }}>
      <FormContainer>
        <Typography 
          variant="h4" 
          color="primary" 
          gutterBottom
          sx={{ 
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}
        >
          회원가입
        </Typography>

        <Stepper activeStep={activeStep} sx={{ marginBottom: '3rem' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          {activeStep !== 0 && (
            <StyledButton
              onClick={handleBack}
              variant="outlined"
              color="primary"
            >
              이전
            </StyledButton>
          )}
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ ml: 'auto' }}
          >
            {activeStep === steps.length - 1 ? '완료' : '다음'}
          </StyledButton>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default Signup; 