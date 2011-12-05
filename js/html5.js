$(document)
		.ready(
				function() {
					$("#save_local_storage").click(
							function() {
								window.localStorage.setItem('value', $(
										"#local_storage").val());
								window.localStorage.setItem('timestamp',
										(new Date()));
							});
					$("#local_storage").val(
							window.localStorage.getItem('value'));
					$("#date_local_storage")
							.text(
									(new Date(window.localStorage
											.getItem('timestamp')))
											.toUTCString());

					var db = window.openDatabase("DBName", "1.0",
							"description", 2 * 1024 * 1024);
					db
							.transaction(function(tx) {
								tx
										.executeSql("CREATE TABLE tweets (id unique,screen_name, date integer, text)");
							});

				});