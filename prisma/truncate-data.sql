DO
$$
DECLARE
    tabel_name TEXT;
BEGIN
    -- Loop untuk melakukan truncate pada semua tabel di schema public
    FOR tabel_name IN
        SELECT quote_ident(tablename) FROM pg_tables WHERE schemaname = 'public'
    LOOP
        EXECUTE 'TRUNCATE TABLE public.' || tabel_name || ' RESTART IDENTITY CASCADE';
    END LOOP;
END
$$;
