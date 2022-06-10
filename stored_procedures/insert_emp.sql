create or replace procedure insert_employee(first_name varchar2, 
                                            last_name varchar2,
                                            email varchar2,
                                            job_id varchar2,
                                            hire_date date DEFAULT sysdate)
as
    emp_id number(11);
begin
    select HR.EMPLOYEES_SEQ.NEXTVAL
    into emp_id
    from dual; 

    insert into employees(employee_id, first_name, last_name, email, job_id, hire_date) 
        values(emp_id, first_name, last_name, email, job_id, sysdate);
    
end insert_employee;
/


























create or replace function insert_emp(first_name varchar2, 
                                            last_name varchar2,
                                            email varchar2,
                                            job_id varchar2,
                                            hire_date date DEFAULT sysdate) return number
as
    emp_id number(11);
begin
    select HR.EMPLOYEES_SEQ.NEXTVAL
    into emp_id
    from dual; 

    insert into employees(employee_id, first_name, last_name, email, job_id, hire_date) 
        values(emp_id, first_name, last_name, email, job_id, sysdate);
    
    return emp_id;
end insert_emp;
/

grant execute on insert_employee to hr_node;
grant execute on insert_emp to hr_node;