import { Pool} from 'pg';

const pool =new Pool ({
    user: 'postgres.xajgqatmlarqhwqairwn',
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    password: 'Sandbox*12345',
    database: 'postgres',
    port: 6543
});

export default pool;
