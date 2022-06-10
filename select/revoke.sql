BEGIN
    FOR t IN (SELECT * FROM user_tables) 
    LOOP   
        EXECUTE IMMEDIATE 'REVOKE SELECT ON ' || t.table_name || ' FROM hr_node';    
    END LOOP;
END;
/