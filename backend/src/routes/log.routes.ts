import { Router, Request, Response } from 'express';
import { Log } from 'logging-package';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { level, package: pkg, message } = req.body;

  try {
    // Validating allowed frontend package values
    const allowedPackages = ['api', 'component', 'hook', 'page', 'state', 'style'];
    const p = allowedPackages.includes(pkg) ? pkg : 'page';

    await Log('frontend', level || 'info', p as any, message || 'No message provided');
    res.status(200).json({ success: true });
  } catch (error) {
    // Fail silently
    res.status(500).json({ success: false });
  }
});

export default router;
