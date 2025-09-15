# Google Analytics Implementation

This document outlines the comprehensive Google Analytics implementation for the portfolio website.

## Features

### 🎯 Enhanced Event Tracking
- **User Interactions**: Navigation clicks, button clicks, form interactions
- **Project Interactions**: GitHub clicks, live demo clicks, project views
- **Social Media**: Social platform clicks with detailed tracking
- **Form Analytics**: Field focus, field changes, form submissions
- **Language Changes**: Track language switching behavior

### 📊 Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS, FCP, TTI tracking
- **Page Load Metrics**: DNS lookup, TCP connection, request/response times
- **Memory Usage**: JavaScript heap size monitoring
- **Network Information**: Connection type, speed, RTT tracking

### 🔍 User Journey Tracking
- **Scroll Depth**: Track 25%, 50%, 75%, 100% scroll milestones
- **Time on Page**: Track time spent on each section
- **Page Views**: Enhanced page view tracking with custom titles
- **Device Information**: Browser, screen resolution, viewport size

### 🚨 Error Tracking
- **JavaScript Errors**: Automatic error capture and reporting
- **Resource Loading Errors**: Track failed image, script, and style loads
- **Unhandled Promise Rejections**: Capture async errors
- **Performance Errors**: Track slow loading resources

### 🛠️ Development Tools
- **Analytics Debugger**: Real-time event monitoring in development
- **Debug Mode**: Console logging for development environment
- **Test Mode**: Safe testing without affecting production data

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Google Analytics Configuration
REACT_APP_GA_MEASUREMENT_ID=G-LQB72FRTH9
REACT_APP_GA_DEBUG=false
REACT_APP_GA_TEST_MODE=false

# Environment
NODE_ENV=development
```

### Measurement ID
- **Development**: Uses test measurement ID or debug mode
- **Production**: Uses production measurement ID
- **Fallback**: Defaults to `G-LQB72FRTH9` if not specified

## Usage

### Basic Event Tracking
```javascript
import { handleEventAnalytics } from './hooks/useGoogleAnalytics';

// Simple event
handleEventAnalytics("Category", "Action");

// Enhanced event with parameters
handleEventAnalytics("Category", "Action", "Label", 100, {
  custom_parameter: "value"
});
```

### Specialized Tracking Functions
```javascript
import { 
  trackUserInteraction,
  trackProjectInteraction,
  trackFormInteraction,
  trackSocialClick,
  trackExternalLink,
  trackScrollDepth,
  trackTimeOnPage,
  trackPerformance,
  trackError
} from './hooks/useGoogleAnalytics';

// Track user interactions
trackUserInteraction("Button Click", "Contact Form", {
  section: "contact",
  action: "submit"
});

// Track project interactions
trackProjectInteraction("Project Name", "GitHub Click", {
  project_category: "web",
  technologies: "React, Node.js"
});

// Track form interactions
trackFormInteraction("Contact Form", "Field Focus", "Email");

// Track social media clicks
trackSocialClick("LinkedIn", "Click");

// Track external links
trackExternalLink("https://github.com/user", "GitHub Profile");

// Track scroll depth
trackScrollDepth(75); // 75% scrolled

// Track time on page
trackTimeOnPage(120); // 120 seconds

// Track performance metrics
trackPerformance("Page Load Time", 1500);

// Track errors
trackError("JavaScript Error", "Cannot read property 'x' of undefined", "App.js:45");
```

### Hooks for Automatic Tracking
```javascript
import { 
  useErrorTracking, 
  usePerformanceMonitoring, 
  useNetworkMonitoring 
} from './hooks/useErrorTracking';

// In your main App component
function App() {
  useErrorTracking(); // Automatic error tracking
  usePerformanceMonitoring(); // Automatic performance monitoring
  useNetworkMonitoring(); // Automatic network monitoring
  
  // ... rest of your component
}
```

## Event Categories

### Navigation
- **NavBar**: Navigation menu clicks
- **Language**: Language switching
- **Dot Group**: Section navigation dots

### Projects
- **Project Interaction**: All project-related interactions
- **Project GitHub**: GitHub repository clicks
- **Project Link**: Live demo clicks

### Forms
- **Form Interaction**: Form field interactions
- **Contact Me Form**: Contact form submissions

### Social Media
- **Social Media**: Social platform clicks
- **External Link**: External website clicks

### Engagement
- **Engagement**: Scroll depth, time on page
- **User Interaction**: General user interactions

### Performance
- **Performance**: Core Web Vitals and performance metrics
- **Device Info**: Device and browser information

### Errors
- **Error**: JavaScript errors, resource loading errors

## Custom Dimensions

The implementation includes several custom dimensions for enhanced analysis:

- `project_name`: Name of the project being interacted with
- `project_category`: Category of the project (web, mobile, etc.)
- `project_technologies`: Technologies used in the project
- `from_language`: Previous language before switch
- `to_language`: New language after switch
- `link_url`: URL of external links
- `link_text`: Text of external links
- `error_message`: Error message details
- `error_location`: Location where error occurred
- `user_agent`: Browser user agent
- `screen_resolution`: Screen resolution
- `viewport_size`: Viewport dimensions
- `timezone`: User's timezone

## Development Tools

### Analytics Debugger
In development mode, a floating analytics debugger appears in the bottom-right corner showing:
- Recent events
- Performance metrics
- Memory usage
- Network information

### Debug Mode
When `REACT_APP_GA_DEBUG=true`, all events are logged to the console for debugging.

### Test Mode
When `REACT_APP_GA_TEST_MODE=true`, events are sent to Google Analytics test mode.

## Best Practices

1. **Event Naming**: Use consistent, descriptive event names
2. **Categories**: Group related events under logical categories
3. **Labels**: Use labels to provide additional context
4. **Values**: Use numeric values for quantifiable metrics
5. **Custom Parameters**: Add relevant custom parameters for detailed analysis
6. **Error Handling**: Always wrap tracking calls in try-catch blocks
7. **Performance**: Use debouncing for high-frequency events like scroll tracking

## Privacy Considerations

- No personally identifiable information (PII) is tracked
- IP addresses are anonymized by Google Analytics
- Users can opt out through browser settings
- GDPR compliance through proper data handling

## Troubleshooting

### Events Not Appearing
1. Check if Google Analytics is properly initialized
2. Verify the measurement ID is correct
3. Check browser console for errors
4. Ensure events are being sent in debug mode

### Performance Issues
1. Check if too many events are being tracked
2. Verify debouncing is implemented for scroll events
3. Monitor memory usage in the debugger

### Development vs Production
1. Use different measurement IDs for different environments
2. Enable debug mode only in development
3. Test thoroughly before deploying to production

## Future Enhancements

- [ ] A/B testing integration
- [ ] Custom dashboard for analytics
- [ ] Real-time analytics monitoring
- [ ] Advanced user segmentation
- [ ] Conversion funnel tracking
- [ ] Heatmap integration
- [ ] User session recording
