-- Add profile photo column to KULLANICILAR table
ALTER TABLE KULLANICILAR ADD PROFIL_FOTO VARCHAR2(4000);

-- Add comment to the column
COMMENT ON COLUMN KULLANICILAR.PROFIL_FOTO IS 'Base64 encoded profile photo or URL to profile image';