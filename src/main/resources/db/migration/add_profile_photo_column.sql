-- Add profile photo column to KULLANICILAR table
ALTER TABLE KULLANICILAR ADD PROFIL_FOTO VARCHAR2(500);

-- Add comment to the column
COMMENT ON COLUMN KULLANICILAR.PROFIL_FOTO IS 'File path to profile image stored in assets/user_images';
