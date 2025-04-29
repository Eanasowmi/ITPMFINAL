import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import {
  Container,
  Typography,
  Avatar,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Card,
  CardActions,
} from "@mui/material";
import { PhotoCamera, Edit, LockReset } from "@mui/icons-material";
import ResponsiveAppBar from "./HomeAppbar";

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4B001E",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
});

const Root = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const ProfileHeader = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  textAlign: "center",
  flexDirection: "column",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(25),
  marginBottom: theme.spacing(2),
}));

const StyledPaper = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    contactNumber: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      if (userInfo && userInfo.token) {
        try {
          const response = await fetch('/api/users/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${userInfo.token}`,
            },
          });
          const data = await response.json();
          setProfile(data);
          setFormValues({
            firstName: data.name,
            lastName: "",
            email: data.email,
            bio: data.bio || "",
            contactNumber: data.mobileNo || "",
            address: data.address || "",
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        }
      } else {
        console.error("No userInfo found");
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.token) {
      console.error("No userInfo found");
      return;
    }

    try {
      const response = await fetch('/api/users/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          name: formValues.firstName,
          email: formValues.email,
          pic: profile.pic, // Keep existing pic or update if new one is uploaded
          mobileNo: formValues.contactNumber,
          address: formValues.address,
          password: formValues.newPassword || undefined,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setProfile(updatedUser);
        setFormValues({
          firstName: updatedUser.name,
          lastName: "",
          email: updatedUser.email,
          bio: updatedUser.bio || "",
          contactNumber: updatedUser.mobileNo || "",
          address: updatedUser.address || "",
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to save profile", error);
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.token) {
      console.error("No userInfo found");
      return;
    }

    try {
      const response = await fetch('/api/users/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          currentPassword: formValues.currentPassword,
          newPassword: formValues.newPassword,
        }),
      });

      if (response.ok) {
        console.log("Password reset successful");
        setIsResettingPassword(false);
      } else {
        console.error("Failed to reset password");
      }
    } catch (error) {
      console.error("Failed to reset password", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!file || !userInfo || !userInfo.token) {
      console.error("No file selected or userInfo not found");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Cloudinary preset

    try {
      const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await uploadResponse.json();
      const imageUrl = result.secure_url;

      const updateResponse = await fetch('/api/users/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ pic: imageUrl }),
      });

      if (updateResponse.ok) {
        const updatedUser = await updateResponse.json();
        setProfile((prevProfile) => ({
          ...prevProfile,
          pic: updatedUser.pic,
        }));
      } else {
        console.error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  if (loading) {
    return (
      <Container component={Root} maxWidth="md">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <ResponsiveAppBar />
      <Container component={Root} maxWidth="md">
        <ProfileHeader>
          <StyledAvatar
            alt="Profile Picture"
            src={profile?.pic || ""}
          />
          <div>
            <Typography variant="h4">
              {profile?.name || "Name"}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {profile?.email || "Email"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {profile?.bio || "Bio"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Contact: {profile?.mobileNo || "Contact Number"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Address: {profile?.address || "Address"}
            </Typography>
          </div>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              startIcon={<Edit />}
              style={{ marginRight: "8px" }}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsResettingPassword(true)}
              startIcon={<LockReset />}
            >
              Reset Password
            </Button>
          </CardActions>
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<PhotoCamera />}
              style={{ marginTop: "8px" }}
            >
              Upload Photo
            </Button>
          </label>
        </ProfileHeader>
        {isEditing && (
          <StyledPaper>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Edit Profile
            </Typography>
            <form onSubmit={handleProfileSave}>
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Bio"
                name="bio"
                value={formValues.bio}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contact Number"
                name="contactNumber"
                value={formValues.contactNumber}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "16px" }}
              >
                Save Changes
              </Button>
            </form>
          </StyledPaper>
        )}
        {isResettingPassword && (
          <StyledPaper>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Reset Password
            </Typography>
            <form onSubmit={handlePasswordReset}>
              <TextField
                fullWidth
                margin="normal"
                label="Current Password"
                name="currentPassword"
                type="password"
                value={formValues.currentPassword}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="New Password"
                name="newPassword"
                type="password"
                value={formValues.newPassword}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                value={formValues.confirmNewPassword}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "16px" }}
              >
                Reset Password
              </Button>
            </form>
          </StyledPaper>
        )}
      </Container>
    </>
  );
};

export default ProfilePage;
