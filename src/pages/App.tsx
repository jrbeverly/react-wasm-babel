import React, { useCallback, useEffect, useState } from "react";

import Canvas from '@components/Canvas';
import Error from '@pages/Error'
import Loading from '@pages/Loading'
import Incompatible from '@pages/Incompatible'
import { Fractal, load } from '@pkg/Fractal'

function useWasm() {
	const [error, setError] = useState<Error | undefined>(undefined);
	const [wasmInstance, setWasmInstance] = useState<Fractal | undefined>(
		undefined
	);
	const [loading, setLoading] = useState(true);
	const initialize = useCallback(async () => {
		try {
			setLoading(true);
			setError(undefined);
			const wasm = await load();
			setWasmInstance(wasm);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		error,
		loading,
		initialize,
		wasmInstance,
	};
}

export default function App() {
	const { error, loading, initialize, wasmInstance } = useWasm();

	useEffect(() => {
		async function loadWasm() {
			await initialize();
		}
		loadWasm();
	}, []);

	if (error) {
		console.error(error);
		return <Error/>
	}

	if (loading) {
		return <Loading/>
	}

	if (!wasmInstance) {
		return <Incompatible />;
	}

	return <Canvas height={512} width={1048} client={wasmInstance} />;
}
