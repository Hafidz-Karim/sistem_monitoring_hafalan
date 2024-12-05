import { Pool } from "pg";
import * as dotenv from "dotenv";
import { Router } from "express";

dotenv.config()

const pool = new Pool({
    user: "postgres.xajgqatmlarqhwqairwn",
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    password: "Sandbox*12345",
    database: "postgres",
    port: 6543
});

const router = Router();

interface sistem_control_hafalan {
    id: number;
    name: string;
    surah_from: string;
    ayat_from: number;
    surah_to: string;
    ayat_to: number;
    status: 'Belum_lancar' | 'Lancar' | 'Sangat_lancar';
    dibuat: Date;
    diupadate: Date;
}

// Create a new reqord
router.post('/api/hafalan', async (req, res) => { 
    try { 
    const { nama_santri, surah_from, ayat_from, surah_to, ayat_to, status } = req.body; 
    const query = ` 
    INSERT INTO sistem-control-hafalan 
    (nama_santri, surah_from, ayat_from, surah_to, ayat_to, status) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING * 
    `; 
    const values = [nama_santri, surah_from, ayat_from, surah_to, ayat_to, status]; 
    const result = await pool.query(query, values); 
    res.json({ status: 'success', data: result.rows[0] }); 
    } catch (err: any) { 
    res.status(500).json({ status: 'error', message: err.message }); 
    } 
    }); 

// Get all records 
router.get('/api/hafalan', async (req, res) => { 
    try { 
    const result = await pool.query('SELECT * FROM sistem-control-hafalan ORDER BY created_at DESC'); res.json({ status: 'success', data: result.rows }); 
    } catch (err: any) { 
    res.status(500).json({ status: 'error', message: err.message }); 
    } 
    }); 

// Update data 
router.put('/api/hafalan/:id', async (req, res) => { 
    try { 
    const { id } = req.params; 
    const { status } = req.body; 
    const result = await pool.query( 
    'UPDATE sistem-control-hafalan SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *', 
    [status, id] 
    ); 
    res.json({ status: 'success', data: result.rows[0] }); 
    } catch (err: any) { 
    res.status(500).json({ status: 'error', message: err.message }); 
    } 
    }); 
    
// Delete data
router.delete('/api/hafalan/:id', async (req, res) => { 
    try { 
    const { id } = req.params; 
    await pool.query('DELETE FROM sistem-control-hafalan WHERE id = $1', [id]); 
    res.json({ status: 'success', message: 'Record deleted successfully' }); 
    } catch (err: any) { 
    res.status(500).json({ status: 'error', message: err.message });
    } 
    }); 
    export default router;
