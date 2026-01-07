package com.example.qwershop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // [중요] 이 메서드를 추가하세요. CSS, JS, 이미지 접근을 시큐리티 검사 없이 통과시킵니다.
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers("/css/**", "/js/**", "/img/**", "/images/**", "/favicon.ico", "/error");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))

                .authorizeHttpRequests(auth -> auth
                        // 페이지 주소들만 허용
                        .requestMatchers("/", "/main", "/signUp", "/find/**", "/search", "/itemList", "/detail", "/user/**").permitAll()
                        .requestMatchers("/members/**", "/item/**", "/detail/**").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated())

                .formLogin(formLogin -> formLogin
                        .loginPage("/user/login") // MainController의 @GetMapping("/user/login")에 맞춤
                        .defaultSuccessUrl("/main", true)
                        .usernameParameter("id")
                        .passwordParameter("pw")
                        .failureUrl("/user/login/error"))

                .logout(logout -> logout
                        .logoutUrl("/members/logout")
                        .logoutSuccessUrl("/main")
                        .invalidateHttpSession(true))

                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint()));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}