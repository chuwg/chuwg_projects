import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Button, Box, Container, 
  IconButton, Drawer, List, ListItem, ListItemText,
  useMediaQuery, useTheme, styled, Typography 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home, 
  Info, 
  ShoppingCart, 
  PersonAdd, 
  Person,
  Close 
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

// 스타일링된 컴포넌트
const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(145deg, #2E7D32 0%, #1B5E20 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const StyledButton = styled(Button)(({ active }) => ({
  color: '#FFFFFF',
  margin: '0 8px',
  padding: '8px 16px',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '5px',
    left: '50%',
    transform: active ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
    transformOrigin: 'center',
    width: '80%',
    height: '2px',
    background: '#FDD835',
    transition: 'transform 0.3s ease',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    '&:after': {
      transform: 'translateX(-50%) scaleX(1)',
    },
  },
}));

const Logo = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#FFFFFF',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  '& img': {
    marginRight: '10px',
    height: '30px',
  },
});

const DrawerHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  background: '#2E7D32',
  color: '#FFFFFF',
});

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: '250px',
  },
});

const StyledListItem = styled(ListItem)({
  margin: '8px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#E8F5E9',
  },
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const menuItems = [
    { text: '홈', path: '/', icon: <Home /> },
    { text: '초당옥수수 이야기', path: '/about', icon: <Info /> },
    { text: '옥수수 주문', path: '/order', icon: <ShoppingCart /> },
    { text: '회원가입', path: '/signup', icon: <PersonAdd /> },
    { text: '내정보', path: '/mypage', icon: <Person /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <DrawerHeader>
        <Logo>초당옥수수</Logo>
        <IconButton 
          onClick={handleDrawerToggle}
          sx={{ color: '#FFFFFF' }}
        >
          <Close />
        </IconButton>
      </DrawerHeader>
      <List>
        {menuItems.map((item) => (
          <StyledListItem 
            button 
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            selected={location.pathname === item.path}
          >
            <Box sx={{ mr: 2, color: '#2E7D32' }}>{item.icon}</Box>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </>
  );

  return (
    <StyledAppBar 
      position="fixed" 
      sx={{
        backgroundColor: scrolled ? '#2E7D32' : 'transparent',
        boxShadow: scrolled ? 3 : 0,
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Logo component={Link} to="/">
            {/* 로고 이미지가 있다면 추가 */}
            초당옥수수
          </Logo>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <StyledButton
                  key={item.text}
                  component={Link}
                  to={item.path}
                  active={location.pathname === item.path ? 1 : 0}
                  startIcon={item.icon}
                >
                  {item.text}
                </StyledButton>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>

      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // 모바일 성능 향상
        }}
      >
        {drawer}
      </StyledDrawer>
    </StyledAppBar>
  );
};

export default Navbar; 