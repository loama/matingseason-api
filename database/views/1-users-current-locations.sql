CREATE OR REPLACE VIEW users_current_locations AS
	SELECT DISTINCT ON (user_locations.user) users.id,
		users.email,
		users.status,
		user_locations.lat,
		user_locations.lng,
		users.password,
		user_locations.updated_at AS last_location_update,
		users.profile_picture,
		users.username,
		users.age
	FROM user_locations

	LEFT JOIN users ON user_locations.user = users.id

	ORDER BY user_locations.user, user_locations.id DESC
