BEGIN
    FOR t IN (SELECT * FROM user_tables) 
    LOOP   
        EXECUTE IMMEDIATE 'REVOKE INSERT ON ' || t.table_name || ' FROM hr_node';    
    END LOOP;
END;
/