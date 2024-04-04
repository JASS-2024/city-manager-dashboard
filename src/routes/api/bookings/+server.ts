// Forward to avoid CORS errors
export async function GET({ url: string }) {
    var response = await fetch('http://192.168.1.77/bookings');
	return response;
}