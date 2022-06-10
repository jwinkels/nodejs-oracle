BEGIN
    FOR t IN (SELECT * FROM user_tables) 
    LOOP   
        EXECUTE IMMEDIATE 'GRANT INSERT ON ' || t.table_name || ' TO hr_node';    
    END LOOP;

    FOR s IN (SELECT * FROM user_sequences) 
    LOOP   
        EXECUTE IMMEDIATE 'GRANT SELECT ON ' || s.sequence_name || ' TO hr_node';    
    END LOOP;
END;
/