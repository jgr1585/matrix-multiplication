plugins {
    id("org.springframework.boot") version "3.2.3"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.22"
    kotlin("plugin.spring") version "1.9.22"
    id("org.springdoc.openapi-gradle-plugin") version "1.6.0"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.4.0")
    implementation("org.springdoc:springdoc-openapi-ui:1.8.0")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(17)
}

openApi {
    apiDocsUrl.set("http://localhost:8080/api-docs")
    outputDir.set(File("./spa"))
    outputFileName.set("openapi.json")
}

// Run 'npm build' in the folder spa and copy the build folder to the resources/static folder before building the jar
tasks.register("copyStaticResources") {
    description = "Copy static resources from spa to resources/static"
    group = "build"

    //Run OpenApi task before copying the static resources
    dependsOn("generateOpenApiDocs")

    doLast {
        exec {
            workingDir = file("spa")
            commandLine = listOf("npm", "install")
        }
        exec {
            workingDir = file("spa")
            commandLine = listOf("npm", "run", "openapi")
        }
        exec {
            workingDir = file("spa")
            commandLine = listOf("npm", "run", "build")
        }
        copy {
            from("spa/build") {
                include("**")
            }
            into("src/main/resources/public")
        }
    }
}

tasks.build {
    dependsOn("copyStaticResources")
}

tasks.jar {
    dependsOn("copyStaticResources")
}
