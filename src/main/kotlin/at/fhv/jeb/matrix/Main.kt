package at.fhv.jeb.matrix

import at.fhv.jeb.matrix.objects.Matrix

@SpringBootApplication
class DemoApplication

fun main(args: Array<String>) {
    runApplication<DemoApplication>(*args)
}

//fun main() {
//    println("Hello World!")
//    val matrixA = Matrix.createRandomMatrix(10000, 10000)
//    val matrixB = Matrix.createRandomMatrix(10000, 10000)
//
////    matrixA.print()
////    println()
////    matrixB.print()
//
//    val start = System.currentTimeMillis()
//    val result = matrixA.multiply(matrixB)
//    println("Time A: ${System.currentTimeMillis() - start}ms")
//
////    println("Result:")
////    result.print()
//}