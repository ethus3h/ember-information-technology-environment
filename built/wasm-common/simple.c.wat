(module
  (type $t0 (func))
  (type $t1 (func (result i32)))
  (type $t2 (func (param i32 i32) (result i32)))
  (func $__wasm_call_ctors (type $t0))
  (func $fourtytwo (type $t1) (result i32)
    (i32.const 42))
  (func $add (type $t2) (param $p0 i32) (param $p1 i32) (result i32)
    (i32.add
      (local.get $p1)
      (local.get $p0)))
  (func $utf8enc (type $t1) (result i32)
    (i32.const 42))
  (func $utf9enc (type $t1) (result i32)
    (i32.const 43))
  (table $T0 1 1 anyfunc)
  (memory $memory (export "memory") 2)
  (global $g0 (mut i32) (i32.const 66560))
  (global $__heap_base (export "__heap_base") i32 (i32.const 66560))
  (global $__data_end (export "__data_end") i32 (i32.const 1024)))
