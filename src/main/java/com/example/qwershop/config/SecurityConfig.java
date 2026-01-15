package com.example.qwershop.config;

import com.example.qwershop.user.member.service.CustomOAuth2UserService;
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
@RequiredArgsConstructor
public class SecurityConfig {

    // [주석 처리] OAuth2 설정이 없으면 이 서비스 빈을 불러오다가 에러가 날 수 있습니다.
    // private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers("/css/**", "/js/**", "/img/**", "/images/**", "/favicon.ico", "/error", "/include/**", "/layouts/**");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/main", "/signUp", "/find/**", "/search/**", "/itemList", "/detail/**", "/user/**").permitAll()
                        .requestMatchers("/order/**").authenticated()
                        .requestMatchers("/members/**", "/item/**", "/include/**", "/layouts/**").permitAll()
                        .requestMatchers("/*.png", "/*.jpg").permitAll()
                        .requestMatchers("/admin/**").permitAll()
                        .anyRequest().authenticated())

                .formLogin(formLogin -> formLogin
                        .loginPage("/user/login")
                        .defaultSuccessUrl("/", true)
                        .usernameParameter("id")
                        .passwordParameter("pw")
                        .failureUrl("/user/login/error"))

                /* [주석 처리] OAuth2 클라이언트 설정(구글/네이버 ID 등)이 없어서 발생하는 부팅 에러 해결 */
                // .oauth2Login(oauth2 -> oauth2
                //         .loginPage("/user/login")
                //         .userInfoEndpoint(userInfo -> userInfo
                //                 .userService(customOAuth2UserService))
                //         .defaultSuccessUrl("/", true))

                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"))

        /* [주석 처리] CustomAuthenticationEntryPoint 클래스가 없거나 설정이 미비할 경우 에러 방지 */
        // .exceptionHandling(exception -> exception
        //         .authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
        ;

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}