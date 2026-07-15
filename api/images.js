const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    // Mengarahkan path ke folder 'images' di root proyek
    const imagesDir = path.join(process.cwd(), 'images');
    const result = {};

    try {
        const categories = fs.readdirSync(imagesDir);
        categories.forEach(category => {
            const categoryPath = path.join(imagesDir, category);
            if (fs.statSync(categoryPath).isDirectory()) {
                const files = fs.readdirSync(categoryPath);
                // Filter hanya file gambar saja (jpg, jpeg, png, gif, webp)
                const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
                result[category] = imageFiles.map(file => `images/${category}/${file}`);
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Gagal membaca folder gambar" });
    }
};