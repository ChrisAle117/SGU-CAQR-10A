// Este Jenkinsfile está configurado para un agente 'any'
// y utiliza comandos 'bat' (Windows/cmd) para ejecutar Docker Compose.
pipeline {
    agent any

    stages {
        // [MODIFICACIÓN CLAVE: ORDEN Y LIMPIEZA DE VOLUMENES]
        // 1. Limpia todos los recursos (contenedores, volúmenes anónimos) del proyecto actual,
        //    incluso si se ejecutó con un nombre anterior como 'deployment'.
        stage('Limpiando Recursos del Proyecto...') {
            steps {
                bat '''
                    // down -v --remove-orphans para limpiar recursos del proyecto actual y previos.
                    docker compose -p SGU-CAQR-10A down -v --remove-orphans || exit /b 0
                    
                    // Si tienes volúmenes con nombres fijos (ej: sgu-volume), elimínalos aquí
                    // ya que no se borran con 'down -v'. Cambia 'sgu-volume' por el nombre exacto si es diferente.
                    echo Intentando eliminar volumen sgu-volume...
                    docker volume rm -f sgu-volume || exit /b 0
                '''
            }
        }
        
        // 2. Limpieza Forzada de Contenedores con Nombre Fijo (soluciona el error "Conflict")
        stage('Pre-limpieza Forzada (Conflicto General)') {
            steps {
                bat '''
                    echo Intentando eliminar contenedores con nombre fijo conflictivos...
                    // Eliminar forzadamente contenedores por nombre.
                    docker rm -f sgu-database || exit /b 0
                    docker rm -f sgu-backend || exit /b 0
                    docker rm -f sgu-frontend || exit /b 0
                    echo Limpieza de nombres fijos completada.
                '''
            }
        }

        // Eliminar las imágenes creadas por ese proyecto
        stage('Eliminando imágenes anteriores...') {
            steps {
                bat '''
                    for /f "tokens=*" %%i in ('docker images --filter "label=com.docker.compose.project=SGU-CAQR-10A" -q') do (
                        docker rmi -f %%i
                    )
                    if errorlevel 1 (
                        echo No hay imagenes por eliminar
                    ) else (
                        echo Imagenes eliminadas correctamente
                    )
                '''
            }
        }

        // Del recurso SCM configurado en el job, jala el repo (checkout)
        stage('Obteniendo actualización...') {
            steps {
                // Descarga el código fuente del repositorio Git
                checkout scm
            }
        }

        // Construir y levantar los servicios
        stage('Construyendo y Desplegando Servicios...') {
            steps {
                bat '''
                    docker compose -p SGU-CAQR-10A up --build -d
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado con éxito'
        }

        failure {
            echo 'Hubo un error al ejecutar el pipeline'
        }

        always {
            echo 'Pipeline finalizado'
        }
    }
}
