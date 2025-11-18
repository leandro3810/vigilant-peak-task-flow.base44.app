def run_setup(script_name, script_args=None, stop_after="run"):
    save_argv = sys.argv
    try:
        sys.argv[0] = script_name
        if script_args is not None:
            sys.argv[1:] = script_args

        # Leia o arquivo como texto (utf-8) e compile para preservar o nome do arquivo em tracebacks
        with open(script_name, 'r', encoding='utf-8') as f:
            source = f.read()

        # compile garante que exceções apontem para script_name
        code = compile(source, script_name, 'exec')
        exec(code, g)
    finally:
        sys.argv = save_argv
