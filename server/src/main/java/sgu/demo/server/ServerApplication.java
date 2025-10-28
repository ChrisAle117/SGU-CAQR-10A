package sgu.demo.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import sgu.demo.server.modules.users.UserController;

@SpringBootApplication(scanBasePackages = {"sgu.demo.server", "sgu.demo.server.modules.users"})
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
