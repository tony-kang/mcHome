/**
 * 데이터베이스 구조 비교 도구
 * 두 데이터베이스의 테이블, 컬럼, 인덱스, 제약조건 등을 비교합니다.
 */

class DatabaseComparator {
    constructor(db1, db2) {
        this.db1 = db1;
        this.db2 = db2;
        this.differences = {
            tables: {
                onlyInDb1: [],
                onlyInDb2: [],
                common: []
            },
            columns: {
                onlyInDb1: [],
                onlyInDb2: [],
                different: []
            },
            indexes: {
                onlyInDb1: [],
                onlyInDb2: [],
                different: []
            },
            constraints: {
                onlyInDb1: [],
                onlyInDb2: [],
                different: []
            }
        };
    }

    /**
     * 데이터베이스 구조 비교 실행
     */
    async compare() {
        console.log('데이터베이스 구조 비교를 시작합니다...\n');

        // 1. 테이블 비교
        await this.compareTables();
        
        // 2. 컬럼 비교
        await this.compareColumns();
        
        // 3. 인덱스 비교
        await this.compareIndexes();
        
        // 4. 제약조건 비교
        await this.compareConstraints();

        // 5. 결과 출력
        this.printResults();
        
        return this.differences;
    }

    /**
     * 테이블 비교
     */
    async compareTables() {
        console.log('📋 테이블 비교 중...');
        
        const tables1 = await this.getTables(this.db1);
        const tables2 = await this.getTables(this.db2);
        
        // DB1에만 있는 테이블
        this.differences.tables.onlyInDb1 = tables1.filter(table => !tables2.includes(table));
        
        // DB2에만 있는 테이블
        this.differences.tables.onlyInDb2 = tables2.filter(table => !tables1.includes(table));
        
        // 공통 테이블
        this.differences.tables.common = tables1.filter(table => tables2.includes(table));
    }

    /**
     * 컬럼 비교
     */
    async compareColumns() {
        console.log('📊 컬럼 비교 중...');
        
        const commonTables = this.differences.tables.common;
        
        for (const tableName of commonTables) {
            const columns1 = await this.getColumns(this.db1, tableName);
            const columns2 = await this.getColumns(this.db2, tableName);
            
            // 각 테이블의 컬럼 구조 비교
            const columnDiff = this.compareColumnStructures(columns1, columns2, tableName);
            
            if (columnDiff.hasDifferences) {
                this.differences.columns.onlyInDb1.push(...columnDiff.onlyInDb1);
                this.differences.columns.onlyInDb2.push(...columnDiff.onlyInDb2);
                this.differences.columns.different.push(...columnDiff.different);
            }
        }
    }

    /**
     * 컬럼 구조 비교
     */
    compareColumnStructures(columns1, columns2, tableName) {
        const result = {
            onlyInDb1: [],
            onlyInDb2: [],
            different: [],
            hasDifferences: false
        };

        // DB1에만 있는 컬럼
        const onlyInDb1 = columns1.filter(col1 => 
            !columns2.some(col2 => col2.name === col1.name)
        );
        
        // DB2에만 있는 컬럼
        const onlyInDb2 = columns2.filter(col2 => 
            !columns1.some(col1 => col1.name === col2.name)
        );

        // 공통 컬럼의 속성 비교
        const commonColumns = columns1.filter(col1 => 
            columns2.some(col2 => col2.name === col1.name)
        );

        for (const col1 of commonColumns) {
            const col2 = columns2.find(c => c.name === col1.name);
            
            const differences = this.getColumnDifferences(col1, col2);
            if (differences.length > 0) {
                result.different.push({
                    table: tableName,
                    column: col1.name,
                    differences: differences,
                    db1: col1,
                    db2: col2
                });
            }
        }

        // 결과 설정
        result.onlyInDb1 = onlyInDb1.map(col => ({ table: tableName, ...col }));
        result.onlyInDb2 = onlyInDb2.map(col => ({ table: tableName, ...col }));
        result.hasDifferences = result.onlyInDb1.length > 0 || 
                               result.onlyInDb2.length > 0 || 
                               result.different.length > 0;

        return result;
    }

    /**
     * 컬럼 차이점 찾기
     */
    getColumnDifferences(col1, col2) {
        const differences = [];
        
        if (col1.type !== col2.type) {
            differences.push({
                field: 'type',
                db1: col1.type,
                db2: col2.type
            });
        }
        
        if (col1.nullable !== col2.nullable) {
            differences.push({
                field: 'nullable',
                db1: col1.nullable,
                db2: col2.nullable
            });
        }
        
        if (col1.default !== col2.default) {
            differences.push({
                field: 'default',
                db1: col1.default,
                db2: col2.default
            });
        }
        
        if (col1.length !== col2.length) {
            differences.push({
                field: 'length',
                db1: col1.length,
                db2: col2.length
            });
        }

        return differences;
    }

    /**
     * 인덱스 비교
     */
    async compareIndexes() {
        console.log('🔍 인덱스 비교 중...');
        
        const commonTables = this.differences.tables.common;
        
        for (const tableName of commonTables) {
            const indexes1 = await this.getIndexes(this.db1, tableName);
            const indexes2 = await this.getIndexes(this.db2, tableName);
            
            // DB1에만 있는 인덱스
            const onlyInDb1 = indexes1.filter(idx1 => 
                !indexes2.some(idx2 => idx2.name === idx1.name)
            );
            
            // DB2에만 있는 인덱스
            const onlyInDb2 = indexes2.filter(idx2 => 
                !indexes1.some(idx1 => idx1.name === idx2.name)
            );

            this.differences.indexes.onlyInDb1.push(...onlyInDb1.map(idx => ({ table: tableName, ...idx })));
            this.differences.indexes.onlyInDb2.push(...onlyInDb2.map(idx => ({ table: tableName, ...idx })));
        }
    }

    /**
     * 제약조건 비교
     */
    async compareConstraints() {
        console.log('🔒 제약조건 비교 중...');
        
        const commonTables = this.differences.tables.common;
        
        for (const tableName of commonTables) {
            const constraints1 = await this.getConstraints(this.db1, tableName);
            const constraints2 = await this.getConstraints(this.db2, tableName);
            
            // DB1에만 있는 제약조건
            const onlyInDb1 = constraints1.filter(con1 => 
                !constraints2.some(con2 => con2.name === con1.name)
            );
            
            // DB2에만 있는 제약조건
            const onlyInDb2 = constraints2.filter(con2 => 
                !constraints1.some(con1 => con1.name === con2.name)
            );

            this.differences.constraints.onlyInDb1.push(...onlyInDb1.map(con => ({ table: tableName, ...con })));
            this.differences.constraints.onlyInDb2.push(...onlyInDb2.map(con => ({ table: tableName, ...con })));
        }
    }

    /**
     * 결과 출력
     */
    printResults() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 데이터베이스 구조 비교 결과');
        console.log('='.repeat(60));

        // 테이블 차이점
        this.printTableDifferences();
        
        // 컬럼 차이점
        this.printColumnDifferences();
        
        // 인덱스 차이점
        this.printIndexDifferences();
        
        // 제약조건 차이점
        this.printConstraintDifferences();

        console.log('\n✅ 비교 완료!');
    }

    printTableDifferences() {
        console.log('\n📋 테이블 차이점:');
        
        if (this.differences.tables.onlyInDb1.length > 0) {
            console.log(`\n🔴 DB1에만 있는 테이블 (${this.differences.tables.onlyInDb1.length}개):`);
            this.differences.tables.onlyInDb1.forEach(table => {
                console.log(`  - ${table}`);
            });
        }
        
        if (this.differences.tables.onlyInDb2.length > 0) {
            console.log(`\n🔵 DB2에만 있는 테이블 (${this.differences.tables.onlyInDb2.length}개):`);
            this.differences.tables.onlyInDb2.forEach(table => {
                console.log(`  - ${table}`);
            });
        }
        
        if (this.differences.tables.onlyInDb1.length === 0 && this.differences.tables.onlyInDb2.length === 0) {
            console.log('  ✅ 테이블 구조가 동일합니다.');
        }
    }

    printColumnDifferences() {
        console.log('\n📊 컬럼 차이점:');
        
        if (this.differences.columns.onlyInDb1.length > 0) {
            console.log(`\n🔴 DB1에만 있는 컬럼 (${this.differences.columns.onlyInDb1.length}개):`);
            this.differences.columns.onlyInDb1.forEach(col => {
                console.log(`  - ${col.table}.${col.name} (${col.type})`);
            });
        }
        
        if (this.differences.columns.onlyInDb2.length > 0) {
            console.log(`\n🔵 DB2에만 있는 컬럼 (${this.differences.columns.onlyInDb2.length}개):`);
            this.differences.columns.onlyInDb2.forEach(col => {
                console.log(`  - ${col.table}.${col.name} (${col.type})`);
            });
        }
        
        if (this.differences.columns.different.length > 0) {
            console.log(`\n🟡 속성이 다른 컬럼 (${this.differences.columns.different.length}개):`);
            this.differences.columns.different.forEach(diff => {
                console.log(`  - ${diff.table}.${diff.column}:`);
                diff.differences.forEach(d => {
                    console.log(`    ${d.field}: "${d.db1}" → "${d.db2}"`);
                });
            });
        }
        
        if (this.differences.columns.onlyInDb1.length === 0 && 
            this.differences.columns.onlyInDb2.length === 0 && 
            this.differences.columns.different.length === 0) {
            console.log('  ✅ 컬럼 구조가 동일합니다.');
        }
    }

    printIndexDifferences() {
        console.log('\n🔍 인덱스 차이점:');
        
        if (this.differences.indexes.onlyInDb1.length > 0) {
            console.log(`\n🔴 DB1에만 있는 인덱스 (${this.differences.indexes.onlyInDb1.length}개):`);
            this.differences.indexes.onlyInDb1.forEach(idx => {
                console.log(`  - ${idx.table}.${idx.name} (${idx.type})`);
            });
        }
        
        if (this.differences.indexes.onlyInDb2.length > 0) {
            console.log(`\n🔵 DB2에만 있는 인덱스 (${this.differences.indexes.onlyInDb2.length}개):`);
            this.differences.indexes.onlyInDb2.forEach(idx => {
                console.log(`  - ${idx.table}.${idx.name} (${idx.type})`);
            });
        }
        
        if (this.differences.indexes.onlyInDb1.length === 0 && this.differences.indexes.onlyInDb2.length === 0) {
            console.log('  ✅ 인덱스 구조가 동일합니다.');
        }
    }

    printConstraintDifferences() {
        console.log('\n🔒 제약조건 차이점:');
        
        if (this.differences.constraints.onlyInDb1.length > 0) {
            console.log(`\n🔴 DB1에만 있는 제약조건 (${this.differences.constraints.onlyInDb1.length}개):`);
            this.differences.constraints.onlyInDb1.forEach(con => {
                console.log(`  - ${con.table}.${con.name} (${con.type})`);
            });
        }
        
        if (this.differences.constraints.onlyInDb2.length > 0) {
            console.log(`\n🔵 DB2에만 있는 제약조건 (${this.differences.constraints.onlyInDb2.length}개):`);
            this.differences.constraints.onlyInDb2.forEach(con => {
                console.log(`  - ${con.table}.${con.name} (${con.type})`);
            });
        }
        
        if (this.differences.constraints.onlyInDb1.length === 0 && this.differences.constraints.onlyInDb2.length === 0) {
            console.log('  ✅ 제약조건 구조가 동일합니다.');
        }
    }

    // 데이터베이스별 메타데이터 조회 메서드들 (구현 필요)
    
    async getTables(db) {
        // 데이터베이스별로 구현 필요
        // 예: MySQL, PostgreSQL, SQLite 등
        throw new Error('getTables method must be implemented for specific database type');
    }

    async getColumns(db, tableName) {
        // 데이터베이스별로 구현 필요
        throw new Error('getColumns method must be implemented for specific database type');
    }

    async getIndexes(db, tableName) {
        // 데이터베이스별로 구현 필요
        throw new Error('getIndexes method must be implemented for specific database type');
    }

    async getConstraints(db, tableName) {
        // 데이터베이스별로 구현 필요
        throw new Error('getConstraints method must be implemented for specific database type');
    }
}

// MySQL 구현 예시
class MySQLComparator extends DatabaseComparator {
    constructor(db1, db2) {
        super(db1, db2);
        this.connection1 = null;
        this.connection2 = null;
    }

    async connect() {
        const mysql = await import('mysql2/promise');
        
        this.connection1 = await mysql.createConnection(this.db1);
        this.connection2 = await mysql.createConnection(this.db2);
    }

    async disconnect() {
        if (this.connection1) await this.connection1.end();
        if (this.connection2) await this.connection2.end();
    }

    async getTables(db) {
        const connection = db === this.db1 ? this.connection1 : this.connection2;
        const query = "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?";
        const [result] = await connection.execute(query, [db.database]);
        return result.map(row => row.TABLE_NAME);
    }

    async getColumns(db, tableName) {
        const connection = db === this.db1 ? this.connection1 : this.connection2;
        const query = `
            SELECT 
                COLUMN_NAME as name,
                DATA_TYPE as type,
                IS_NULLABLE as nullable,
                COLUMN_DEFAULT as \`default\`,
                CHARACTER_MAXIMUM_LENGTH as length
            FROM information_schema.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
            ORDER BY ORDINAL_POSITION
        `;
        const [result] = await connection.execute(query, [db.database, tableName]);
        return result;
    }

    async getIndexes(db, tableName) {
        const connection = db === this.db1 ? this.connection1 : this.connection2;
        const query = `
            SELECT 
                INDEX_NAME as name,
                INDEX_TYPE as type,
                COLUMN_NAME
            FROM information_schema.STATISTICS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
            ORDER BY INDEX_NAME, SEQ_IN_INDEX
        `;
        const [result] = await connection.execute(query, [db.database, tableName]);
        
        // 인덱스별로 그룹화
        const indexes = {};
        result.forEach(row => {
            if (!indexes[row.name]) {
                indexes[row.name] = {
                    name: row.name,
                    type: row.type,
                    columns: []
                };
            }
            indexes[row.name].columns.push(row.COLUMN_NAME);
        });
        
        return Object.values(indexes);
    }

    async getConstraints(db, tableName) {
        const connection = db === this.db1 ? this.connection1 : this.connection2;
        const query = `
            SELECT 
                CONSTRAINT_NAME as name,
                CONSTRAINT_TYPE as type
            FROM information_schema.TABLE_CONSTRAINTS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
        `;
        const [result] = await connection.execute(query, [db.database, tableName]);
        return result;
    }
}

// PostgreSQL 구현 예시
class PostgreSQLComparator extends DatabaseComparator {
    constructor(db1, db2) {
        super(db1, db2);
        this.client1 = null;
        this.client2 = null;
    }

    async connect() {
        const { Client } = await import('pg');
        
        this.client1 = new Client(this.db1);
        this.client2 = new Client(this.db2);
        
        await this.client1.connect();
        await this.client2.connect();
    }

    async disconnect() {
        if (this.client1) await this.client1.end();
        if (this.client2) await this.client2.end();
    }

    async getTables(db) {
        const client = db === this.db1 ? this.client1 : this.client2;
        const query = `
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
        `;
        const result = await client.query(query);
        return result.rows.map(row => row.table_name);
    }

    async getColumns(db, tableName) {
        const client = db === this.db1 ? this.client1 : this.client2;
        const query = `
            SELECT 
                column_name as name,
                data_type as type,
                is_nullable as nullable,
                column_default as default,
                character_maximum_length as length
            FROM information_schema.columns 
            WHERE table_name = $1
            ORDER BY ordinal_position
        `;
        const result = await client.query(query, [tableName]);
        return result.rows;
    }

    async getIndexes(db, tableName) {
        const client = db === this.db1 ? this.client1 : this.client2;
        const query = `
            SELECT 
                indexname as name,
                indexdef as definition
            FROM pg_indexes 
            WHERE tablename = $1
        `;
        const result = await client.query(query, [tableName]);
        return result.rows.map(row => ({
            name: row.name,
            definition: row.definition
        }));
    }

    async getConstraints(db, tableName) {
        const client = db === this.db1 ? this.client1 : this.client2;
        const query = `
            SELECT 
                conname as name,
                contype as type
            FROM pg_constraint 
            WHERE conrelid = $1::regclass
        `;
        const result = await client.query(query, [tableName]);
        return result.rows;
    }
}

// 사용 예시
async function compareDatabases() {
    let comparator = null;
    
    try {
        // 데이터베이스 연결 설정
        const db1 = {
            type: 'mysql',
            host: '49.254.84.171',
            user: 'root',
            password: 'Xpffpvktlelql123!',
            database: 'code_v1'
        };

        const db2 = {
            type: 'mysql',
            host: '49.254.84.152',
            user: 'root',
            password: 'Akdlsemzhemelql123!',
            database: 'mc_v1'
        };

        // 비교 실행
        comparator = new MySQLComparator(db1, db2);
        
        // 데이터베이스 연결
        console.log('🔌 데이터베이스 연결 중...');
        await comparator.connect();
        
        // 비교 실행
        const differences = await comparator.compare();

        // 결과를 파일로 저장
        const fs = await import('fs');
        fs.writeFileSync('database_differences.json', JSON.stringify(differences, null, 2));
        console.log('\n📄 결과가 database_differences.json 파일에 저장되었습니다.');

    } catch (error) {
        console.error('❌ 오류 발생:', error.message);
        console.error('상세 오류:', error);
    } finally {
        // 연결 정리
        if (comparator) {
            try {
                await comparator.disconnect();
                console.log('🔌 데이터베이스 연결을 종료했습니다.');
            } catch (error) {
                console.error('연결 종료 중 오류:', error.message);
            }
        }
    }
}

// 모듈 내보내기
export {
    DatabaseComparator,
    MySQLComparator,
    PostgreSQLComparator,
    compareDatabases
};

// 직접 실행 시
if (import.meta.url === `file://${process.argv[1]}`) {
    compareDatabases().catch(console.error);
}
