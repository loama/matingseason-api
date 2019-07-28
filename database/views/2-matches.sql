CREATE OR REPLACE VIEW matches AS
SELECT l1.id, l1.liker, l1.liked, l1.created_at, l1.updated_at FROM likes l1
LEFT JOIN likes l2
ON l1.liker = l2.liked AND l1.liked = l2.liker
WHERE l2.liker IS NOT NULL
