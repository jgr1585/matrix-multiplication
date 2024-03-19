package at.fhv.jeb.matrix.objects

import java.io.File

class Matrix(
    private val matrix: List<List<Int>>
) {
    companion object {
        fun createRandomMatrix(rows: Int, cols: Int): Matrix {
            return Matrix(
                (0 ..< rows).map {
                    (0 ..< cols).map {
                        (0..100).random()
                    }
                }
            )
        }
    }

    fun print() {
        for (row in matrix) {
            for (cell in row) {
                print("$cell ")
            }
            println()
        }
    }

    fun multiply(other: Matrix): Result {
        val startTime = System.nanoTime()
        val times = mutableListOf<Long>()
        val result = matrix.map { row ->
            List(row.size) { j ->
                matrix.indices.sumOf { k ->
                    row[k] * other.matrix[k][j]
                }.also {
                    times.add(System.nanoTime() - startTime)
                }
            }
        }
        return Result(Matrix(result), times)
    }

    fun add(other: Matrix): Result {
        val startTime = System.nanoTime()
        val times = mutableListOf<Long>()
        val result = matrix.mapIndexed { i, row ->
                row.mapIndexed { j, cell ->
                    cell + other.matrix[i][j]
                }.also {
                    times.add(System.nanoTime() - startTime)
                }
            }
        return Result(Matrix(result), times)
    }


    class Result(
        val matrix: Matrix,
        val times: List<Long>
    )
}