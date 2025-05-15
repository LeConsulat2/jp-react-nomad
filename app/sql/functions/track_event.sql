CREATE OR REPLACE function track_event(
    event_type event_type,
    event_data jsonb
) returns void as $$
BEGIN
    insert into events (event_type, event_data)
    values (event_type, event_data);
END;
$$ language plpgsql;



