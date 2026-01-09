package com.example.qwershop.config;

import com.example.qwershop.user.member.service.CustomOAuth2UserService; // 패키지 경로 확인!
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor // [추가] 서비스 주입을 위해 추가
public class SecurityConfig {

    // [추가] 방금 만든 카카오 처리 서비스를 시큐리티가 알 수 있게 가져옵니다.
    private final CustomOAuth2UserService customOAuth2UserService;

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
                        .requestMatchers("/", "/main", "/signUp", "/find/**", "/search", "/itemList", "/detail", "/user/**").permitAll()
                        .requestMatchers("/members/**", "/item/**", "/detail/**").permitAll()
                        .requestMatchers("/admin/**").permitAll()
                        .anyRequest().authenticated())

                .formLogin(formLogin -> formLogin
                        .loginPage("/user/login")
                        .defaultSuccessUrl("/", true)
                        .usernameParameter("id")
                        .passwordParameter("pw")
                        .failureUrl("/user/login/error"))

                // [추가] 소셜 로그인 설정 시작
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/user/login") // 소셜 로그인도 실패 시 여기로
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService)) // 카카오 정보를 처리할 서비스 연결
                        .defaultSuccessUrl("/", true))
                // [추가] 소셜 로그인 설정 끝

                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"))

                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint()));


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}