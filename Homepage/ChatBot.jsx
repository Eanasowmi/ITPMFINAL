// src/components/ChatBot.js
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Box, CircularProgress, Fade, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

// Set the default name if userInfo or name is not available
const userName = userInfo?.name || "folk";

// Predefined questions and dummy answers with variations
const predefinedResponses = {

    "hi": `Hi ${userName}, how can I help you?\nPlease type anything like "order", "payment", "date", "delivery", etc.`,
    "What is this app about": "This app allows you to design custom T-shirts by selecting materials, colors, and adding your own text and graphics.",
    "What is this app about growing your friend's blog?": "This app is not related to blogs. It focuses on customizing T-shirts.",
    "Can I add text to my T-shirt design": "Yes, you can add and customize text on your T-shirt design.",
    "Can I add text to my T-shirt design, or is it not supported and doesn't work?": "Adding text is fully supported. You can customize it as per your preference.",
    "What website this": "This is an online T-shirt design and customization platform.",
    "today date": "Today's date is: " + new Date().toLocaleDateString(),
    "Price": "Prices vary depending on T-shirt material and customization. Check the pricing page for details.",
    "usd to lkr": "To convert USD to LKR, you can use an online currency converter. We don't offer conversion services.",
    "What features does this app offer?": "The app offers features like choosing T-shirt material, color, and adding custom text and images.",
    "How does this app work?": "Select a T-shirt type, choose a material and color, add your design or text, and then place your order.",
    "Is there a mobile app available for this service?": "Currently, there is no mobile app available. The service is accessible through the website.",
    "Can I choose different types of T-shirt materials?": "Yes, you can choose from materials like cotton, polyester, and blends.",
    "What colors are available for the T-shirts?": "We offer a variety of colors including basic and seasonal shades.",
    "Can I upload my own images for the T-shirt design?": "Yes, you can upload your own images for a custom design.",
    "How do I add text to my T-shirt design?": "Use the text tool in the design editor to add and customize text.",
    "Can I preview my T-shirt design before ordering?": "Yes, you can preview a mockup of your design before placing the order.",
    "Is there a limit to how much text I can add?": "While there is no strict limit, it's best to keep text concise for clarity.",
    "What payment methods do you accept?": "We accept major credit cards and PayPal. ApplePay is not supported.",
    "How long does it take to receive my order?": "Orders typically take 5-7 business days to process and ship.",
    "Can I cancel or modify my order after placing it?": "You can modify or cancel your order within 24 hours. Contact support for assistance.",
    "Do you offer international shipping?": "Yes, we offer international shipping. Costs and delivery times vary by destination.",
    "What is your return policy?": "Returns are accepted within 30 days for defective or incorrect items. Custom designs are non-returnable unless there's an error.",
    "How do I track my order?": "You will receive a tracking number via email once your order has shipped.",
    "I'm having trouble uploading my design. What should I do?": "Ensure the file meets our requirements. Contact support if the issue persists.",
    "The text I added isn't displaying correctly.": "Check the preview and text settings. Contact support if the issue is with the print.",
    "Why is the color on my T-shirt different from what I see on my screen?": "Colors on screens may differ from printed colors. We aim for close matches.",
    "The website is not loading properly. What can I do?": "Try refreshing the page or clearing your browser cache. Contact support if the issue continues.",
    "I forgot my account password. How do I reset it?": "Use the 'Forgot Password' link to reset your password. Follow the instructions sent to your email.",
    "app": "This app allows you to design custom T-shirts by selecting materials, colors, and adding your own text and graphics.",
    "blog": "This app is not related to blogs. It focuses on customizing T-shirts.",
    "text": "Yes, you can add and customize text on your T-shirt design.",
    "design": "Adding text is fully supported. You can customize it as per your preference.",
    "website": "This is an online T-shirt design and customization platform.",
    "date": "Today's date is: " + new Date().toLocaleDateString(),
    "price": "Prices vary depending on T-shirt material and customization. Check the pricing page for details.",
    "conversion": "To convert USD to LKR, you can use an online currency converter. We don't offer conversion services.",
    "features": "The app offers features like choosing T-shirt material, color, and adding custom text and images.",
    "work": "Select a T-shirt type, choose a material and color, add your design or text, and then place your order.",
    "mobile": "Currently, there is no mobile app available. The service is accessible through the website.",
    "materials": "Yes, you can choose from materials like cotton, polyester, and blends.",
    "colors": "We offer a variety of colors including basic and seasonal shades.",
    "images": "Yes, you can upload your own images for a custom design.",
    "preview": "Yes, you can preview a mockup of your design before placing the order.",
    "limit": "While there is no strict limit, it's best to keep text concise for clarity.",
    "payment": "We accept major credit cards and PayPal. ApplePay is not supported.",
    "delivery": "Orders typically take 5-7 business days to process and ship.",
    "order": "You can modify or cancel your order within 24 hours. Contact support for assistance.",
    "shipping": "Yes, we offer international shipping. Costs and delivery times vary by destination.",
    "return": "Returns are accepted within 30 days for defective or incorrect items. Custom designs are non-returnable unless there's an error.",
    "tracking": "You will receive a tracking number via email once your order has shipped.",
    "upload": "Ensure the file meets our requirements. Contact support if the issue persists.",
    "display": "Check the preview and text settings. Contact support if the issue is with the print.",
    "color": "Colors on screens may differ from printed colors. We aim for close matches.",
    "loading": "Try refreshing the page or clearing your browser cache. Contact support if the issue continues.",
    "password": "Use the 'Forgot Password' link to reset your password. Follow the instructions sent to your email.",
    "app about": "This app allows you to design custom T-shirts by selecting materials, colors, and adding your own text and graphics.",
    "blog growing": "This app is not related to blogs. It focuses on customizing T-shirts.",
    "text add": "Yes, you can add and customize text on your T-shirt design.",
    "design support": "Adding text is fully supported. You can customize it as per your preference.",
    "website this": "This is an online T-shirt design and customization platform.",
    "date today": "Today's date is: " + new Date().toLocaleDateString(),
    "price vary": "Prices vary depending on T-shirt material and customization. Check the pricing page for details.",
    "usd lkr": "To convert USD to LKR, you can use an online currency converter. We don't offer conversion services.",
    "features offer": "The app offers features like choosing T-shirt material, color, and adding custom text and images.",
    "app work": "Select a T-shirt type, choose a material and color, add your design or text, and then place your order.",
    "mobile app": "Currently, there is no mobile app available. The service is accessible through the website.",
    "materials choose": "Yes, you can choose from materials like cotton, polyester, and blends.",
    "colors available": "We offer a variety of colors including basic and seasonal shades.",
    "images upload": "Yes, you can upload your own images for a custom design.",
    "text add": "Use the text tool in the design editor to add and customize text.",
    "design preview": "Yes, you can preview a mockup of your design before placing the order.",
    "text limit": "While there is no strict limit, it's best to keep text concise for clarity.",
    "payment accept": "We accept major credit cards and PayPal. ApplePay is not supported.",
    "order receive": "Orders typically take 5-7 business days to process and ship.",
    "order cancel": "You can modify or cancel your order within 24 hours. Contact support for assistance.",
    "shipping international": "Yes, we offer international shipping. Costs and delivery times vary by destination.",
    "return policy": "Returns are accepted within 30 days for defective or incorrect items. Custom designs are non-returnable unless there's an error.",
    "order track": "You will receive a tracking number via email once your order has shipped.",
    "design trouble": "Ensure the file meets our requirements. Contact support if the issue persists.",
    "text displaying": "Check the preview and text settings. Contact support if the issue is with the print.",
    "color difference": "Colors on screens may differ from printed colors. We aim for close matches.",
    "website loading": "Try refreshing the page or clearing your browser cache. Contact support if the issue continues.",
    "password reset": "Use the 'Forgot Password' link to reset your password. Follow the instructions sent to your email."

};

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatBotVisible, setChatBotVisible] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, isUser: true };
        setMessages([...messages, userMessage]);
        setInput('');
        setLoading(true);

        // Check for predefined responses
        const responseText = predefinedResponses[input.trim()] || 'Sorry, I do not understand that question.';

        if (predefinedResponses[input.trim()]) {
            // If we have a predefined response, use it
            setMessages([...messages, userMessage, { text: responseText, isUser: false }]);
            setLoading(false);
        } else {
            let modelEndpoint;
            if (input.includes('technical')) {
                modelEndpoint = 'https://api-inference.huggingface.co/models/t5-large';
            } else {
                modelEndpoint = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large';
            }

            try {
                const response = await axios.post(
                    modelEndpoint,
                    { inputs: input },
                    {
                        headers: {
                            Authorization: `Bearer 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`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // Check if the response contains the generated text
                const aiResponse = response.data[0]?.generated_text || 'No response from model';
                setMessages([...messages, userMessage, { text: aiResponse, isUser: false }]);
            } catch (error) {
                console.error("Error communicating with the Hugging Face API:", error);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                }
                setMessages([...messages, userMessage, { text: 'Error occurred, please try again later.', isUser: false }]);
            } finally {
                setLoading(false);
            }
        }
    };

    const toggleChatBot = () => {
        setChatBotVisible(!chatBotVisible);
    };

    return (
        <>
            <Fade in={!chatBotVisible}>
                <IconButton 
                    color="primary" 
                    onClick={toggleChatBot} 
                    style={{ 
                        position: 'fixed', 
                        bottom: 20, 
                        right: 20, 
                        backgroundColor: '#4a90e2', 
                        color: 'white',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <ChatIcon />
                </IconButton>
            </Fade>
            
            <Fade in={chatBotVisible}>
                <Paper 
                    elevation={6} 
                    style={{ 
                        position: 'fixed', 
                        bottom: 20, 
                        right: 20, 
                        width: 380, 
                        height: 600, 
                        display: 'flex', 
                        flexDirection: 'column',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
                    }}
                >
                    <Box 
                        p={2} 
                        style={{ 
                            backgroundColor: '#4a90e2', 
                            color: 'white', 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Unique Creations
                        </Typography>
                        <IconButton onClick={toggleChatBot} style={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box 
                        p={2} 
                        style={{ 
                            flexGrow: 1, 
                            overflowY: 'auto', 
                            backgroundColor: '#f5f8fb', 
                            display: 'flex', 
                            flexDirection: 'column'
                        }}
                    >
                        <List>
                            {messages.map((message, index) => (
                                <ListItem key={index} style={{ padding: '8px 0' }}>
                                    <ListItemText
                                        primary={
                                            <Typography 
                                                style={{ 
                                                    color: message.isUser ? '#333' : '#fff',
                                                    backgroundColor: message.isUser ? '#e6e9ec' : '#4a90e2',
                                                    padding: '12px 16px',
                                                    borderRadius: message.isUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                                    maxWidth: '80%',
                                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                                    alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                                                    marginBottom: '4px'
                                                }}
                                            >
                                                {message.text}
                                            </Typography>
                                        }
                                        style={{ 
                                            display: 'flex', 
                                            justifyContent: message.isUser ? 'flex-end' : 'flex-start' 
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <div ref={messagesEndRef} />
                    </Box>
                    {loading && (
                        <Box sx={{ textAlign: 'center', py: 2, backgroundColor: '#f5f8fb' }}>
                            <CircularProgress size={24} style={{ color: '#4a90e2' }} />
                        </Box>
                    )}
                    <Box sx={{ p: 2, backgroundColor: '#f5f8fb' }}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={handleSend} disabled={loading} style={{ color: '#4a90e2' }}>
                                        <SendIcon />
                                    </IconButton>
                                ),
                                style: { backgroundColor: 'white', borderRadius: '30px' }
                            }}
                        />
                    </Box>
                </Paper>
            </Fade>
        </>
    );
};

export default ChatBot;