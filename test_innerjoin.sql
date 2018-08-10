SELECT p.id, p.description, users.username
FROM photos AS p
INNER JOIN users ON p.author_id = users.id;