CREATE OR REPLACE VIEW users_current_locations AS
SELECT u.id, u.email, u.status, ul.lat, ul.lng, u.password, ul.created_at AS last_location_update FROM users u
LEFT JOIN user_locations ul
	ON ul.user = u.id
	AND ul.id = (
		SELECT id
		FROM user_locations ul2
		ORDER BY id DESC
		LIMIT 1
	)
