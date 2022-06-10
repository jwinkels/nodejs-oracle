BEGIN
    FOR t IN (SELECT * FROM user_tables) 
    LOOP   
        EXECUTE IMMEDIATE 'GRANT SELECT ON ' || t.table_name || ' TO hr_node';    
    END LOOP;
END;
/