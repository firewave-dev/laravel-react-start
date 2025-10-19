# Email Notification System - Setup Guide

## 🎉 What's Been Built

Your church website now has a complete email notification system! Users with email notifications enabled will automatically receive beautiful emails when:

- **📰 New Blog Posts** are published
- **📅 New Events** are announced
- **📢 New Bulletins** are posted

## 📧 How It Works

### 1. **User Preferences**
Users can enable/disable email notifications from their **Account Settings** page:
- `email_notifications` field in `user_preferences` table
- Default: **enabled** (true)

### 2. **Automatic Notifications**
Emails are sent automatically when:
- Creating new content with status "Published" or "Active"
- Changing existing content from "Draft" to "Published"
- Only for **immediate** publications (not scheduled ones)

### 3. **Who Receives Emails**
Only users who have:
- A preference record in the database
- `email_notifications` set to `true`

## 🚀 Configuration

### Step 1: Configure Email in `.env`

You need to set up your email service. Here are common options:

#### **Option A: Gmail (Development/Testing)**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

**Note:** For Gmail, you need to create an [App Password](https://support.google.com/accounts/answer/185833)

#### **Option B: Mailtrap (Development/Testing)**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-mailtrap-username
MAIL_PASSWORD=your-mailtrap-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourchurch.com
MAIL_FROM_NAME="${APP_NAME}"
```

#### **Option C: Log (Development Only - No Real Emails)**
```env
MAIL_MAILER=log
MAIL_FROM_ADDRESS=noreply@yourchurch.com
MAIL_FROM_NAME="${APP_NAME}"
```

Emails will be logged to `storage/logs/laravel.log` instead of being sent.

### Step 2: Clear Configuration Cache
```bash
php artisan config:clear
php artisan cache:clear
```

### Step 3: Test the System

1. **Enable Email Notifications for a User:**
   - Login to your admin account
   - Go to User Management
   - Edit a user or create preferences
   - Ensure `email_notifications` is checked (true)

2. **Create and Publish Content:**
   - Go to Blog & News → Create Post
   - Fill in the details
   - Set Status to "Published"
   - Leave Publish Date empty (immediate)
   - Click Save

3. **Check Email:**
   - If using `log` driver: Check `storage/logs/laravel.log`
   - If using Mailtrap: Check your Mailtrap inbox
   - If using Gmail: Check recipient's inbox

## 📬 Email Templates

Three beautiful, church-themed email templates have been created:

### **1. Post Published Email**
- Subject: "New Post: [Post Title]"
- Shows: Title, Category, Excerpt, Read More button
- Template: `resources/views/emails/post-published.blade.php`

### **2. Event Published Email**
- Subject: "New Event: [Event Title]"
- Shows: Date, Time, Location, Recurrence, View Calendar button
- Template: `resources/views/emails/event-published.blade.php`

### **3. Bulletin Posted Email**
- Subject: "[PRIORITY] [Bulletin Title]"
- Shows: Priority badge, Type, Message, Expiration
- High-priority bulletins have red styling
- Template: `resources/views/emails/bulletin-posted.blade.php`

## 🎨 Email Design Features

- ☦ Orthodox church theme with gold accents
- 📱 Mobile-responsive design
- 🎨 Professional gradient backgrounds
- 🔔 Priority indicators for urgent bulletins
- 🔗 Direct links to content
- 👤 Author/poster information

## 🔄 How Notifications Trigger

### **Posts**
```php
// Sends email when:
- Status = 'published'
- published_at is empty OR in the past
- Triggered on create() or update()
```

### **Events**
```php
// Sends email when:
- Status = 'published'
- published_at is empty OR in the past
- Triggered on create() or update()
```

### **Bulletins**
```php
// Sends email when:
- Status = 'active'
- Triggered on create() or when changing to active
```

## ⏰ Scheduled Publishing & Emails

**Important:** Scheduled content does NOT send emails immediately!

- If you set a future `published_at` date → Email waits until that time
- Emails only send for content that becomes visible immediately
- For scheduled posts: You'd need a Laravel scheduler/cron job (not implemented yet)

## 🛠 Troubleshooting

### No Emails Being Sent?

1. **Check .env configuration:**
   ```bash
   php artisan config:clear
   ```

2. **Verify user has preferences:**
   ```bash
   php artisan tinker
   >>> User::with('preference')->find(1)
   ```

3. **Check email_notifications is true:**
   ```bash
   php artisan tinker
   >>> User::getEmailSubscribers()
   ```

4. **Check logs:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

### Emails Going to Spam?

- Set up SPF/DKIM records for your domain
- Use a reputable email service (not Gmail for production)
- Ensure MAIL_FROM_ADDRESS matches your domain

## 📊 Database Query

To see who will receive notifications:
```sql
SELECT users.email, user_preferences.email_notifications
FROM users
JOIN user_preferences ON users.id = user_preferences.user_id
WHERE user_preferences.email_notifications = 1;
```

## 🔮 Future Enhancements (Not Implemented)

- Queue emails for better performance
- Weekly digest option
- SMS notifications (using Twilio)
- Custom notification preferences per content type
- Scheduled email for scheduled posts (requires cron)
- Email templates in multiple languages

## 📝 Files Modified

**Controllers:**
- `app/Http/Controllers/PostController.php`
- `app/Http/Controllers/EventController.php`
- `app/Http/Controllers/BulletinController.php`

**Mailable Classes:**
- `app/Mail/PostPublished.php`
- `app/Mail/EventPublished.php`
- `app/Mail/BulletinPosted.php`

**Email Templates:**
- `resources/views/emails/post-published.blade.php`
- `resources/views/emails/event-published.blade.php`
- `resources/views/emails/bulletin-posted.blade.php`

**Models:**
- `app/Models/User.php` (added `getEmailSubscribers()` method)

---

**Ready to test!** Set up your email config and publish some content! 📧✨

