const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Import modules
const emailService = require('./src/main/modules/email');
const whatsappService = require('./src/main/modules/whatsapp');
const smsService = require('./src/main/modules/sms');
const driveSyncService = require('./src/main/modules/driveSync');
const database = require('./src/main/modules/database');

// Create the main application window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  // Load the React app
  mainWindow.loadFile('build/index.html');
  
  // Open DevTools in development
  // mainWindow.webContents.openDevTools();
}

// When Electron is ready, create the window
app.whenReady().then(() => {
  // Initialize database with default password
  // In a real implementation, this would be derived from user input
  database.initDatabase('default-password');
  
  createWindow();

  // For macOS, reactivate the app when dock icon is clicked
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers
ipcMain.handle('get-app-info', () => {
  return {
    name: 'MS Pro Send',
    version: app.getVersion()
  };
});

// Database IPC handlers
ipcMain.handle('db-get-contacts', async () => {
  return database.getContacts();
});

ipcMain.handle('db-add-contact', async (event, contact) => {
  return database.addContact(contact);
});

ipcMain.handle('db-update-contact', async (event, contact) => {
  return database.updateContact(contact);
});

ipcMain.handle('db-delete-contact', async (event, id) => {
  return database.deleteContact(id);
});

ipcMain.handle('db-get-templates', async () => {
  return database.getTemplates();
});

ipcMain.handle('db-add-template', async (event, template) => {
  return database.addTemplate(template);
});

ipcMain.handle('db-update-template', async (event, template) => {
  return database.updateTemplate(template);
});

ipcMain.handle('db-delete-template', async (event, id) => {
  return database.deleteTemplate(id);
});

ipcMain.handle('db-get-campaigns', async () => {
  return database.getCampaigns();
});

ipcMain.handle('db-add-campaign', async (event, campaign) => {
  return database.addCampaign(campaign);
});

ipcMain.handle('db-update-campaign', async (event, campaign) => {
  return database.updateCampaign(campaign);
});

ipcMain.handle('db-delete-campaign', async (event, id) => {
  return database.deleteCampaign(id);
});

ipcMain.handle('db-get-accounts', async () => {
  return database.getAccounts();
});

ipcMain.handle('db-add-account', async (event, account) => {
  return database.addAccount(account);
});

ipcMain.handle('db-update-account', async (event, account) => {
  return database.updateAccount(account);
});

ipcMain.handle('db-delete-account', async (event, id) => {
  return database.deleteAccount(id);
});

ipcMain.handle('db-get-automation-rules', async () => {
  return database.getAutomationRules();
});

ipcMain.handle('db-add-automation-rule', async (event, rule) => {
  return database.addAutomationRule(rule);
});

ipcMain.handle('db-update-automation-rule', async (event, rule) => {
  return database.updateAutomationRule(rule);
});

ipcMain.handle('db-delete-automation-rule', async (event, id) => {
  return database.deleteAutomationRule(id);
});

ipcMain.handle('db-get-logs', async () => {
  return database.getLogs();
});

ipcMain.handle('db-add-log', async (event, log) => {
  return database.addLog(log);
});

ipcMain.handle('db-get-settings', async () => {
  return database.getSettings();
});

ipcMain.handle('db-update-setting', async (event, key, value) => {
  return database.updateSetting(key, value);
});

// Email service IPC handlers
ipcMain.handle('email-add-account', async (event, accountId, tokens) => {
  return await emailService.addGmailAccount(accountId, tokens);
});

ipcMain.handle('email-send', async (event, accountId, contact, template) => {
  return await emailService.sendEmail(accountId, contact, template);
});

// WhatsApp service IPC handlers
ipcMain.handle('whatsapp-add-account', async (event, accountId, credentials) => {
  return await whatsappService.addBusinessAPIAccount(accountId, credentials);
});

ipcMain.handle('whatsapp-send', async (event, accountId, contact, template) => {
  return await whatsappService.sendWhatsAppMessage(accountId, contact, template);
});

// SMS service IPC handlers
ipcMain.handle('sms-add-gsm-account', async (event, accountId, config) => {
  return await smsService.addGsmModemAccount(accountId, config);
});

ipcMain.handle('sms-add-api-account', async (event, accountId, credentials) => {
  return await smsService.addApiAccount(accountId, credentials);
});

ipcMain.handle('sms-send', async (event, accountId, contact, template) => {
  return await smsService.sendSMS(accountId, contact, template);
});

// Google Drive sync IPC handlers
ipcMain.handle('drive-init', async (event, tokens) => {
  return await driveSyncService.initDriveClient(tokens);
});

ipcMain.handle('drive-upload', async (event, filename, content) => {
  return await driveSyncService.uploadFile(filename, content);
});

ipcMain.handle('drive-download', async (event, fileId) => {
  return await driveSyncService.downloadFile(fileId);
});

ipcMain.handle('drive-list-files', async () => {
  return await driveSyncService.listSyncFiles();
});