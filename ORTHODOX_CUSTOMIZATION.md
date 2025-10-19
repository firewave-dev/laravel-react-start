# Orthodox Church Customization Guide

## 🎨 Adding Real Orthodox Icons and Frescoes

Your website is now styled with Orthodox-inspired CSS patterns, but you can make it even more authentic by adding real Orthodox artwork.

### 📸 Recommended Images to Add

#### 1. **Theotokos (Holy Mother of God) Icon**
Replace the Unicode cross (☦) with an actual Theotokos icon:

**File location:** `public/images/theotokos-icon.png` (create this folder)
**Recommended size:** 120x120px, PNG with transparent background
**Famous icons to consider:**
- Virgin and Child Enthroned (Hagia Sophia)
- Theotokos of Vladimir
- Our Lady of the Sign (Znamenie)
- Theotokos Hodegetria

**How to implement:**
```jsx
// In FrontLayout.jsx, replace the Text element with:
<img 
  src="/images/theotokos-icon.png" 
  alt="Theotokos Icon"
  style={{ width: 40, height: 40 }}
/>
```

#### 2. **Orthodox Fresco Background**
Add a real Byzantine fresco as header background:

**File location:** `public/images/orthodox-fresco.jpg`
**Recommended size:** 1920x400px, optimized JPEG
**Famous frescoes to consider:**
- Christ Pantocrator (Monastery of Saint Catherine, Sinai)
- Deesis from Hagia Sophia
- Frescoes from Studenica Monastery
- Paintings from Mount Athos monasteries

**How to implement:**
```css
/* In orthodox.css, update .orthodox-fresco-bg */
.orthodox-fresco-bg {
  background: 
    linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.9)),
    url('/images/orthodox-fresco.jpg');
  background-size: cover;
  background-position: center;
}
```

#### 3. **Additional Icons** (Optional)
Add more Orthodox symbols throughout the site:

**Saints icons for different sections:**
- `saint-nicholas.png` - For charitable activities
- `saint-basil.png` - For liturgical information  
- `archangel-michael.png` - For protection prayers

### 🎭 Orthodox Color Palette

The current design uses authentic Orthodox colors:

```css
:root {
  --orthodox-gold: #FFD700;        /* Byzantine gold */
  --orthodox-dark-gold: #DAA520;   /* Darker gold accents */
  --orthodox-brown: #8B4513;       /* Saddle brown */
  --orthodox-dark-brown: #654321;  /* Dark brown */
  --orthodox-cream: #FFF8DC;       /* Cornsilk */
  --orthodox-burgundy: #800020;    /* Deep red (optional) */
}
```

### 🖼️ Image Sources

**Legal and appropriate sources:**
1. **Wikimedia Commons** - Public domain Orthodox art
2. **Orthodox monastery websites** - Many offer free-use images
3. **Icon painting workshops** - Commission custom work
4. **Orthodox publishers** - Licensed artwork

**Important:** Always respect copyright and sacred nature of religious artwork.

### 📱 Responsive Images

Make sure to provide different sizes for mobile:

```
public/images/
├── theotokos-icon.png (120x120 - desktop)
├── theotokos-icon-mobile.png (80x80 - mobile)
├── orthodox-fresco.jpg (1920x400 - desktop)
└── orthodox-fresco-mobile.jpg (800x200 - mobile)
```

### ✨ Current Features

Your Orthodox styling already includes:

- ✅ **Authentic color scheme** - Gold, brown, cream
- ✅ **Byzantine patterns** - CSS-generated sacred geometry
- ✅ **Orthodox typography** - Serif fonts with gold gradients
- ✅ **Sacred animations** - Gentle halo effects and holy light
- ✅ **Fresco textures** - Aged paint and crack effects
- ✅ **Trilingual support** - EN/FR/SR including Cyrillic

### 🛡️ Best Practices

1. **Respect for sacred art** - Handle religious imagery with reverence
2. **High quality images** - Orthodox art deserves proper presentation  
3. **Appropriate context** - Use liturgical images meaningfully
4. **Performance** - Optimize images for web loading
5. **Accessibility** - Include proper alt text describing the saints/scenes

### 📞 Need Help?

Contact Orthodox art suppliers or local Orthodox churches for guidance on:
- Appropriate iconographic choices
- Liturgical calendar considerations  
- Cultural sensitivity for different Orthodox traditions
- Permission for using specific monastery artwork

---

*"The icon is a window to heaven" - Orthodox tradition*
