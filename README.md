# MS Pro Send

A professional desktop application for multi-channel marketing automation (Email, WhatsApp, SMS) with contact management, campaigns, templates, automation rules, and logs.

## Features

### General
- Windows Desktop application (EXE)
- Dark theme with gradient accents
- Local storage with optional Google Drive cloud sync
- Automatic encrypted backups with configurable location
- Password-protected access

### Account Management
- Support for multiple accounts per platform (Email, WhatsApp, SMS)
- OAuth/Web login for Gmail and other email providers
- WhatsApp QR code scan or API integration
- SIM/modem integration for SMS
- Per-account controls:
  - Show if messaging is active
  - Messages sent today
  - Daily message limits
  - Randomized send timing
  - Account on/off toggle (manual or automatic after limits reached)
- Detailed panel with full message history, timestamps, and delivery status per contact

### Contact Management
- Import contacts via CSV/XLSX with manual column mapping
- Detect duplicates with merge/skip options
- Assign contacts to specific groups
- Preview imported data before saving
- Export all contacts with message history, templates, tags
- Filter by group, date range, delivery status, tags
- Search, sort, and filter contacts across all panels
- Bulk operations: add contacts to groups, group-specific imports

### Template System
- Create/edit templates for Email, WhatsApp, SMS
- Real-time template preview
- Template card view with coding/design flexibility
- Assign templates to specific channels
- Schedule sending per template
- Integration with campaigns and automation rules

### Campaigns
- Start/pause per campaign
- Live sending progress indicator (card view per campaign)
- Shows template assigned, channel, messages sent/delivered/failed, schedule/time
- Multi-channel support per campaign

### Automation Rules
- Define rules per campaign/contact
- Preferred sending channel (Email, WhatsApp, SMS)
- Conditional sending (skip SMS if WhatsApp succeeds, send via Email if account available)
- Daily limits per account with pause/resume and random timings
- Optional scheduling per message or template

### Dashboard / Live View
- Live statistics widget: total messages sent, delivered, failed, per-channel pie chart
- Real-time display: account → contact → message → template → send/delivery timestamps
- Stop/pause per message or campaign
- Export dashboard data filtered by date, campaign, account

### Logs & Export
- Activity logs per account, contact, campaign
- Export logs with filters: group, date, delivery status, template
- Notifications for success/failure or limits reached

## Technology Stack

- **Electron**: Cross-platform desktop application framework
- **React**: UI library for building the user interface
- **Tailwind CSS**: Styling framework for dark theme with gradient accents
- **SQLite**: Local database storage
- **SQLCipher**: Database encryption
- **Nodemailer**: Email sending
- **Google APIs**: Google Drive integration
- **SerialPort**: SMS modem communication
- **Chart.js**: Dashboard statistics visualization
- **BCrypt**: Password hashing

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ms-pro-send.git
   cd ms-pro-send
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Building for Windows

To package the application as a Windows executable:
```
npm run build
```

This will create a distributable EXE file in the `dist` directory.

## Modules

The application is organized into several modules:

### Frontend Modules
- `src/modules/database.js`: Interface with main process database
- `src/modules/messaging.js`: Handle message sending logic
- `src/modules/backup.js`: Manage local backups
- `src/modules/cloudSync.js`: Handle cloud synchronization
- `src/modules/auth.js`: Manage authentication flows
- `src/modules/encryption.js`: Handle data encryption/decryption
- `src/modules/searchFilter.js`: Handle live search and filtering
- `src/modules/passwordProtection.js`: Manage app launch password
- `src/modules/interModuleComm.js`: Coordinate data flow between modules
- `src/modules/notifications.js`: Handle user notifications

### Main Process Modules
- `src/main/modules/database.js`: Encrypted SQLite database operations
- `src/main/modules/email.js`: Email sending via Nodemailer
- `src/main/modules/whatsapp.js`: WhatsApp Business API integration
- `src/main/modules/sms.js`: SMS sending via modems or APIs
- `src/main/modules/driveSync.js`: Google Drive synchronization

## UI Components

- `src/components/Dashboard.js`: Main dashboard with statistics
- `src/components/Contacts.js`: Contact management interface
- `src/components/Templates.js`: Template creation and management
- `src/components/Campaigns.js`: Campaign creation and monitoring
- `src/components/Accounts.js`: Account management
- `src/components/Logs.js`: Activity logging
- `src/components/Settings.js`: Application settings
- `src/components/Automation.js`: Automation rule management

## Security

- All local data is encrypted using SQLCipher
- Passwords are hashed using BCrypt
- OAuth tokens are stored securely
- Backup files are encrypted with AES-256-GCM

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the Electron team for the excellent framework
- Thanks to the React team for the UI library
- Thanks to the Tailwind CSS team for the styling framework