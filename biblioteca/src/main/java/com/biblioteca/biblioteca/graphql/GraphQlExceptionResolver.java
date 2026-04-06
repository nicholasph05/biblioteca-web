package com.biblioteca.biblioteca.graphql;

import com.biblioteca.biblioteca.exception.BadRequestException;
import com.biblioteca.biblioteca.exception.ResourceNotFoundException;
import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class GraphQlExceptionResolver extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
        Throwable causa = obtenerCausaReal(ex);

        if (causa instanceof ResourceNotFoundException rnfe) {
            return GraphqlErrorBuilder.newError(env)
                    .errorType(ErrorType.NOT_FOUND)
                    .message(rnfe.getMessage())
                    .extensions(Map.of(
                            "code", "NOT_FOUND"
                    ))
                    .build();
        }

        if (causa instanceof BadRequestException bre) {
            return GraphqlErrorBuilder.newError(env)
                    .errorType(ErrorType.BAD_REQUEST)
                    .message(bre.getMessage())
                    .extensions(Map.of(
                            "code", "BAD_REQUEST"
                    ))
                    .build();
        }

        if (causa instanceof ConstraintViolationException cve) {
            Map<String, String> validaciones = new LinkedHashMap<>();

            int i = 1;
            for (ConstraintViolation<?> violation : cve.getConstraintViolations()) {
                validaciones.put("error_" + i, violation.getMessage());
                i++;
            }

            return GraphqlErrorBuilder.newError(env)
                    .errorType(ErrorType.BAD_REQUEST)
                    .message("Existen campos inválidos")
                    .extensions(Map.of(
                            "code", "VALIDATION_ERROR",
                            "validations", validaciones
                    ))
                    .build();
        }

        if (causa instanceof BindException be) {
            Map<String, String> validaciones = new LinkedHashMap<>();

            for (FieldError fieldError : be.getBindingResult().getFieldErrors()) {
                validaciones.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return GraphqlErrorBuilder.newError(env)
                    .errorType(ErrorType.BAD_REQUEST)
                    .message("Existen campos inválidos")
                    .extensions(Map.of(
                            "code", "VALIDATION_ERROR",
                            "validations", validaciones
                    ))
                    .build();
        }

        if (causa instanceof AccessDeniedException ade) {
            return GraphqlErrorBuilder.newError(env)
                    .errorType(ErrorType.FORBIDDEN)
                    .message("No tienes permisos para ejecutar esta operación")
                    .extensions(Map.of(
                            "code", "FORBIDDEN"
                    ))
                    .build();
        }

        return GraphqlErrorBuilder.newError(env)
                .errorType(ErrorType.INTERNAL_ERROR)
                .message("Ocurrió un error interno en la ejecución de GraphQL")
                .extensions(Map.of(
                        "code", "INTERNAL_SERVER_ERROR"
                ))
                .build();
    }

    private Throwable obtenerCausaReal(Throwable ex) {
        Throwable actual = ex;

        while (actual.getCause() != null && actual.getCause() != actual) {
            actual = actual.getCause();
        }

        return actual;
    }
}