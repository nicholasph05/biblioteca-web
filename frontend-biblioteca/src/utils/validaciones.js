export function validarCedula(cedula) {
  const valor = cedula.trim()

  if (!valor) return 'La cédula es obligatoria'
  if (!/^\d{5,20}$/.test(valor)) {
    return 'La cédula debe contener solo números y tener entre 5 y 20 dígitos'
  }

  return ''
}

export function validarNombreCompleto(nombre) {
  const valor = nombre.trim()

  if (!valor) return 'El nombre completo es obligatorio'
  if (valor.length < 3) return 'El nombre completo debe tener al menos 3 caracteres'
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ' -]+$/.test(valor)) {
    return 'El nombre solo puede contener letras, espacios, guiones y apóstrofes'
  }

  return ''
}

export function validarNacionalidad(nacionalidad) {
  if (!nacionalidad.trim()) return 'Debes seleccionar una nacionalidad'
  return ''
}

export function validarIsbn(isbn) {
  const valor = isbn.trim()

  if (!valor) return 'El ISBN es obligatorio'
  if (!/^[0-9Xx-]{10,20}$/.test(valor)) {
    return 'El ISBN debe tener entre 10 y 20 caracteres y solo contener números, guiones o X'
  }

  return ''
}

export function validarTitulo(titulo) {
  const valor = titulo.trim()

  if (!valor) return 'El título es obligatorio'
  if (valor.length < 2) return 'El título debe tener al menos 2 caracteres'
  if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]/.test(valor)) {
    return 'El título no puede estar compuesto solo por símbolos'
  }

  return ''
}

export function validarEditorial(editorial) {
  const valor = editorial.trim()

  if (!valor) return 'La editorial es obligatoria'
  if (valor.length < 2) return 'La editorial debe tener al menos 2 caracteres'
  if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(valor)) {
    return 'La editorial debe contener letras válidas'
  }

  return ''
}

export function validarGenero(genero) {
  if (!genero.trim()) return 'Debes seleccionar un género'
  return ''
}

export function validarAnioPublicacion(anio) {
  const anioActual = new Date().getFullYear()
  const valor = Number(anio)

  if (anio === '' || anio === null || anio === undefined) {
    return 'El año de publicación es obligatorio'
  }

  if (!Number.isInteger(valor)) {
    return 'El año de publicación debe ser un número entero'
  }

  if (valor < 1450 || valor > anioActual) {
    return `El año de publicación debe estar entre 1450 y ${anioActual}`
  }

  return ''
}

export function validarAutorCedula(autorCedula) {
  if (!autorCedula.trim()) return 'Debes seleccionar un autor'
  return ''
}

export function validarUserName(userName) {
  const valor = userName.trim()

  if (!valor) return 'El user_name es obligatorio'
  if (valor.length < 4 || valor.length > 50) {
    return 'El user_name debe tener entre 4 y 50 caracteres'
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(valor)) {
    return 'El user_name solo puede contener letras, números, punto, guion y guion bajo'
  }

  return ''
}

export function validarPassword(password) {
  const valor = password.trim()

  if (!valor) return 'La password es obligatoria'
  if (valor.length < 4 || valor.length > 100) {
    return 'La password debe tener entre 4 y 100 caracteres'
  }

  return ''
}

export function validarTipoUsuario(tipo) {
  if (!tipo.trim()) return 'Debes seleccionar un tipo de usuario'
  if (!['ADMINISTRADOR', 'EMPLEADO'].includes(tipo)) {
    return 'El tipo de usuario seleccionado no es válido'
  }

  return ''
}