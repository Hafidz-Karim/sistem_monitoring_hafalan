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

