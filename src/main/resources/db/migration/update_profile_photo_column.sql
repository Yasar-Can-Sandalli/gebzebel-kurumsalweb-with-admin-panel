-- Update existing PROFIL_FOTO column to VARCHAR2(500) if it exists
-- This script handles the case where the column might already exist as CLOB or VARCHAR2(4000)

-- First, try to drop the column if it exists (in case it's CLOB)
BEGIN
    EXECUTE IMMEDIATE 'ALTER TABLE KULLANICILAR DROP COLUMN PROFIL_FOTO';
EXCEPTION
    WHEN OTHERS THEN
        -- Column doesn't exist or can't be dropped, continue
        NULL;
END;
/

-- Add the column with the correct type
ALTER TABLE KULLANICILAR ADD PROFIL_FOTO VARCHAR2(500);

-- Add comment to the column
COMMENT ON COLUMN KULLANICILAR.PROFIL_FOTO IS 'File path to profile image stored in assets/user_images';
