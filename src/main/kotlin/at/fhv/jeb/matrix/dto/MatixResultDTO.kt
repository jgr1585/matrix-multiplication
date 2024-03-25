package at.fhv.jeb.matrix.dto

import java.io.Serializable

data class MatrixResultDTO(
    val matrixA: List<List<Int>>,
    val matrixB: List<List<Int>>,
    val result: List<List<Int>>,
    val timeNs: Long
): Serializable