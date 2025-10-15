import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors()); 
app.use(express.json()); 

const TABLE_NAME = 'items'; 

// --- Rute API CRUD ---

// 1. CREATE: Tambah Barang Baru (POST /api/items)
app.post('/api/items', async (req, res) => {
    const { nama_sepatu, warna, layanan } = req.body;
    
    // Validasi sederhana
    if (!nama_sepatu || !layanan) {
        return res.status(400).json({ error: 'nama_sepatu dan layanan wajib diisi.' });
    }

    const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([{ nama_sepatu, warna, layanan, status: 'Masuk' }])
        .select(); 

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

// 2. READ: Lihat Semua Barang (GET /api/items) atau Filter Status (GET /api/items?status=...)
app.get('/api/items', async (req, res) => {
    const { status } = req.query; 
    let query = supabase.from(TABLE_NAME).select('*');

    // Menerapkan filter status
    if (status) {
        query = query.eq('status', status);
    }
    
    // Sortir berdasarkan tanggal masuk terbaru
    query = query.order('tgl_masuk', { ascending: false });

    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

// 3. READ: Lihat Barang Berdasarkan ID (GET /api/items/:id)
app.get('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single(); 

    if (error && error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Barang tidak ditemukan.' });
    }
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});


// 4. UPDATE: Ubah Status/Detail Barang (PUT /api/items/:id)
app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .update(updates)
        .eq('id', id)
        .select();

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Barang tidak ditemukan.' });
    }
    res.status(200).json(data[0]);
});

// 5. DELETE: Hapus Barang (DELETE /api/items/:id)
app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { error, count } = await supabase
        .from(TABLE_NAME)
        .delete({ count: 'exact' }) 
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
});

// Handler root '/' (Wajib untuk Vercel)
app.get('/', (req, res) => {
    res.send('Shoe Laundry API is running!');
});

// Export Express app (Wajib untuk Vercel Serverless Function)
export default app; 
// Jika Run secara lokal, bisa menambahkan:
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 